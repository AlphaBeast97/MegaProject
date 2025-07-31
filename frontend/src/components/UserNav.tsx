import { UserButton } from "@clerk/nextjs";

export function UserNav() {
  return (
    <UserButton afterSignOutUrl="/" />
  );
}
