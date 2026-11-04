import { redirect } from "next/navigation";

/** QR lands on /menu and opens the printable PDF menu. */
export default function MenuPage() {
  redirect("/menu.pdf");
}
