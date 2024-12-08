import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollersState } from "@/stores/create-scrollers-store";
import React, { useState } from "react";
import ScollerListItem from "@/components/scroller-list-item";
import TextScrollerCanvas from "@/components/text-scroller-canvas";
import { Button, buttonVariants } from "@/components/ui/button";
import { Cat, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useScrollerEditorStore } from "@/stores/use-scroller-editor-store";
import { useTranslation } from "react-i18next";
import { useScrollerInstanceStore } from "@/stores/use-scroller-instance-store";

export default function ScrollerListSheet(props: {
  open: boolean;
  onOpenChange: (isVisible: boolean) => void;
  scrollersStore: ScrollersState;
  children?: React.ReactNode;
  onDeleteItemClick?: (itemId: string) => void;
  onDeleteAllClick?: () => void;
}) {
  const [isDeleteAllConfirmDialogVisible, setIsDeleteAllConfirmDialogVisible] =
    useState<boolean>(false);
  const scrollerEditorStore = useScrollerEditorStore();
  const scrollerInstanceStore = useScrollerInstanceStore()

  const { t } = useTranslation();

  return (
    <>
      <Sheet open={props.open} onOpenChange={props.onOpenChange}>
        <SheetContent
          side="left"
          className="flex flex-col gap-2 h-full bg-[#faf9f8]"
        >
          <SheetHeader>
            <SheetTitle>{props.children}</SheetTitle>
            <VisuallyHidden>
              <SheetDescription />
            </VisuallyHidden>
          </SheetHeader>
          <div className="flex flex-col flex-1 gap-4 h-0 overflow-y-auto">
            {props.scrollersStore.scrollers.length !== 0 ? (
              props.scrollersStore.scrollers.map((scroller) => (
                <ScollerListItem
                  title={scroller.scrollerConfig.scrollerText}
                  createdAt={scroller.createdAt}
                  key={scroller.id}
                  className="flex-shrink-0"
                  onDeleteClick={() => {
                    props.scrollersStore.remove(scroller.id);
                  }}
                  onEditClick={() => {
                    scrollerEditorStore.setScrollerConfig(
                      scroller.scrollerConfig
                    );
                    props.onOpenChange(false)
                  }}
                  onPlayClick={() => {
                    scrollerInstanceStore.showScrollerWithConfig(
                      scroller.scrollerConfig
                    );
                    props.onOpenChange(false)
                  }}
                >
                  <TextScrollerCanvas
                    scrollerConfig={scroller.scrollerConfig}
                  />
                </ScollerListItem>
              ))
            ) : (
              <div className="flex flex-col text-slate-500 items-center justify-center flex-1 h-0 gap-1">
                <Cat className="h-6 w-6" />
                <span>{t('noData')}</span>
              </div>
            )}
          </div>
          {props.scrollersStore.scrollers.length !== 0 &&
            props.onDeleteAllClick && (
              <SheetFooter>
                <Button
                  className="w-full"
                  variant="destructive"
                  onClick={() => setIsDeleteAllConfirmDialogVisible(true)}
                >
                  <Trash2 />
                  {t("deleteAll")}
                </Button>
              </SheetFooter>
            )}
        </SheetContent>
      </Sheet>
      <AlertDialog
        open={isDeleteAllConfirmDialogVisible}
        onOpenChange={setIsDeleteAllConfirmDialogVisible}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("dialog.deleteAll.title")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("dialog.deleteAll.description")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={props.onDeleteAllClick}
              className={buttonVariants({ variant: "destructive" })}
              title={t("deleteAll")}
              aria-label={t("deleteAll")}
            >
              {t("deleteAll")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
