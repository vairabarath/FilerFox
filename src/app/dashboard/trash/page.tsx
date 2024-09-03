"use client";

import { FileBrowser } from "../_components/file-browser";

export default function Favorites() {
  return (
    <div>
      <FileBrowser title="Trash" deletedOnly />
    </div>
  );
}
