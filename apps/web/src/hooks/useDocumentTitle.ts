import { useEffect } from 'react';

const APP_NAME = 'HAVEN';

/** Sets `document.title` to "<title> · HAVEN". */
export function useDocumentTitle(title: string | undefined): void {
  useEffect(() => {
    document.title = title ? `${title} · ${APP_NAME}` : `${APP_NAME} — Elderly Care & Facility Management`;
  }, [title]);
}
