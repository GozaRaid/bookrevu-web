"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePutDisplayname } from "@/features/profile/UsePutDisplayname";
import ProfilePictureDialog from "./ProfilePictureDialog";

export default function ProfileSection({ userData }) {
  const [displayName, setDisplayName] = useState(userData?.displayname || "");
  const [avatarUrl, setAvatarUrl] = useState(
    userData?.profile_image_url || "/placeholder-user.jpg"
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const putDisplayname = usePutDisplayname();

  const handleDisplayNameChange = (e) => {
    setDisplayName(e.target.value);
  };

  const handleAvatarChange = (file) => {
    const imageUrl = URL.createObjectURL(file);
    setAvatarUrl(imageUrl);
  };

  const handleAvatarRemove = () => {
    setAvatarUrl("/placeholder.svg?height=100&width=100");
  };

  const handleUpdateDisplayName = async () => {
    try {
      await putDisplayname.mutateAsync({
        displayname: displayName,
      });
      window.location.reload();
    } catch (error) {
      console.error("Error updating display name:", error);
    }
  };

  return (
    <div className="w-full max-w-2xl p-6 mx-auto rounded-lg shadow bg-card">
      <h2 className="mb-4 text-2xl font-semibold">Profile</h2>
      <div className="space-y-4">
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={() => setIsDialogOpen(true)}
            className="relative w-32 h-32 overflow-hidden rounded-full hover:opacity-90"
          >
            <img
              src={avatarUrl}
              alt={displayName}
              className="object-cover w-full h-full"
            />
          </button>
          <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
            Change Profile Picture
          </Button>
        </div>
        <div>
          <Label htmlFor="displayName">Display Name</Label>
          <Input
            id="displayName"
            value={displayName}
            onChange={handleDisplayNameChange}
            className="mt-1"
          />
        </div>
        <Button onClick={handleUpdateDisplayName}>Update Display Name</Button>
      </div>
      <ProfilePictureDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        currentImage={avatarUrl}
        onImageChange={handleAvatarChange}
        onImageRemove={handleAvatarRemove}
      />
    </div>
  );
}
