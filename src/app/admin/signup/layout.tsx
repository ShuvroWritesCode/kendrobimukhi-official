export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Override admin layout - no sidebar for signup page
  return <>{children}</>;
}
