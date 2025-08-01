"use client";

import { useUser, useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

export function useUserSync() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    const syncUser = async () => {
      if (isLoaded && user) {
        try {
          const token = await getToken();
          if (!token) return;

          // Try to get existing user
          const userResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (userResponse.status === 404 || userResponse.status === 401) {
            // User doesn't exist, create new user
            const createResponse = await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (createResponse.ok) {
              const createdUser = await createResponse.json();
            } else {
              console.error("Failed to create user:", createResponse.status);
            }
          } else if (userResponse.ok) {
            const existingUser = await userResponse.json();
          }
        } catch (error) {
          console.error("Error syncing user:", error);
        }
      }
    };

    syncUser();
  }, [isLoaded, user, getToken]);

  return { user, isLoaded };
}
