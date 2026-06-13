import { PageHeader } from "@/components/page-header";
import { UpdateProfileForm } from "@/components/forms/update-profile-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { isDemoAuthEnabled } from "@/lib/auth";
import { getCurrentUser } from "@/lib/demo-user";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  return (
    <>
      <PageHeader
        eyebrow="Profile"
        title="Candidate profile"
        description="Keep your positioning up to date so analyses and cover letters reflect who you are today."
      />
      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Personal positioning</CardTitle>
          <CardDescription>
            This profile anchors your workflow and can be connected to a real auth provider later.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UpdateProfileForm user={user} isDemoAuthActive={isDemoAuthEnabled()} />
        </CardContent>
      </Card>
    </>
  );
}
