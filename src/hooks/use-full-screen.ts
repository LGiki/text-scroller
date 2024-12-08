import { useCallback, useEffect, useState } from "react"

const FULLSCREEN_METHODS = {
    request: [
        "requestFullscreen",
        "webkitRequestFullscreen",
        "webkitEnterFullscreen",
        "webkitEnterFullScreen",
        "mozRequestFullScreen",
        "msRequestFullscreen",
    ],
    exit: [
        "exitFullscreen",
        "webkitExitFullscreen",
        "webkitExitFullScreen",
        "webkitCancelFullScreen",
        "mozCancelFullScreen",
        "msExitFullscreen",
    ],
    check: [
        "fullscreenElement",
        "webkitFullscreenElement",
        "mozFullScreenElement",
        "msFullscreenElement",
    ],
    eventHandles: [
        "fullscreenchange",
        "webkitfullscreenchange",
        "mozfullscreenchange",
        "MSFullscreenChange",
    ]
}

export default function useFullScreen(ref: React.RefObject<HTMLElement>) {
    const [isFullScreen, setIsFullScreen] = useState(false)

    const invokeMethod = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (object: any, methods: string[]) => {
            for (const method of methods) {
                if (method in object && typeof object[method] === "function") {
                    object[method]()
                    return true
                }
            }
            return false
        },
        []
    )

    const checkFullScreenStatus = useCallback(() => {
        for (const method of FULLSCREEN_METHODS.check) {
            if (method in document) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return Boolean((document as any)[method])
            }
        }
        return false
    }, [])

    const requestFullScreen = useCallback(() => {
        const element = ref.current
        if (!element) {
            return
        }
        const success = invokeMethod(element, FULLSCREEN_METHODS.request)
        if (!success) {
            console.error("FullScreen API is not supported on this element.")
        }
    }, [ref, invokeMethod])

    const exitFullScreen = useCallback(() => {
        if (checkFullScreenStatus()) {
            const success = invokeMethod(document, FULLSCREEN_METHODS.exit)
            if (!success) {
                console.error("FullScreen API is not supported on this document.")
            }
        }
    }, [checkFullScreenStatus, invokeMethod])

    const toggleFullScreen = useCallback(() => {
        if (checkFullScreenStatus()) {
            exitFullScreen()
        } else {
            requestFullScreen()
        }
    }, [checkFullScreenStatus, exitFullScreen, requestFullScreen])

    useEffect(() => {
        const handleFullScreenChange = () => {
            setIsFullScreen(checkFullScreenStatus())
        }

        FULLSCREEN_METHODS.eventHandles.forEach((event) =>
            document.addEventListener(event, handleFullScreenChange)
        )

        return () => {
            FULLSCREEN_METHODS.eventHandles.forEach((event) =>
                document.removeEventListener(event, handleFullScreenChange)
            )
        }
    }, [checkFullScreenStatus])

    return {
        isFullScreen,
        enterFullScreen: requestFullScreen,
        exitFullScreen,
        toggleFullScreen,
    }
}
