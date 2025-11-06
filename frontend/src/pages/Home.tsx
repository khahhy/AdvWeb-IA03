import { useEffect, useState } from "react";
import { getProfile } from "@/api/user";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AppHeader from "@/components/AppHeader";

export default function Home() {
  const [profile, setProfile] = useState<{ email: string } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        return;
      }

      try {
        const data = await getProfile(token);
        setProfile(data);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("access_token");
        window.location.reload();
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader email={profile?.email} onLogout={handleLogout} />

      <main className="container mx-auto mt-10 p-6">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">
              IA03 - User Registration API with React Frontend
              {profile && (
                <>
                  <br />
                  Hello, {profile.email}
                </>
              )}
            </CardTitle>

            <CardDescription>
              Advanced Web Application Development
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              {profile ? `Hello, ${profile.email}` : "Log in to view exercises"}
            </p>
            {profile && (
              <p className="mt-4 text-sm text-gray-600 whitespace-pre-line">
                Implement a complete User Registration System that includes:
                <br />
                - A backend API (NestJS recommended) to handle user registration
                and data management.
                <br />- A React frontend that allows users to sign up and log in
                through a user-friendly interface.
              </p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
