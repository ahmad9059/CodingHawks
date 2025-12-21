"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Users,
  ArrowUp,
  ArrowDown,
  Linkedin,
  Instagram,
  Github,
  Globe,
} from "lucide-react";
import Image from "next/image";
import { CabinetImageUpload } from "./cabinet-image-upload";

type TeamMember = {
  id: string;
  name: string;
  position: string;
  imageUrl: string | null;
  bio: string | null;
  linkedin: string | null;
  instagram: string | null;
  github: string | null;
  website: string | null;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type TeamMemberManagerProps = {
  initialTeamMembers: TeamMember[];
};

export function TeamMemberManager({
  initialTeamMembers,
}: TeamMemberManagerProps) {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    imageUrl: "",
    bio: "",
    linkedin: "",
    instagram: "",
    github: "",
    website: "",
    order: 0,
    isActive: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/admin/cabinet", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          editingId ? { ...formData, id: editingId } : formData
        ),
      });

      if (response.ok) {
        const updatedMember = await response.json();

        if (editingId) {
          setTeamMembers(
            teamMembers.map((member) =>
              member.id === editingId ? updatedMember : member
            )
          );
          setEditingId(null);
        } else {
          setTeamMembers([...teamMembers, updatedMember]);
        }

        setIsDialogOpen(false);
        setFormData({
          name: "",
          position: "",
          imageUrl: "",
          bio: "",
          linkedin: "",
          instagram: "",
          github: "",
          website: "",
          order: 0,
          isActive: true,
        });
      }
    } catch (error) {
      console.error("Error saving team member:", error);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setFormData({
      name: member.name,
      position: member.position,
      imageUrl: member.imageUrl || "",
      bio: member.bio || "",
      linkedin: member.linkedin || "",
      instagram: member.instagram || "",
      github: member.github || "",
      website: member.website || "",
      order: member.order,
      isActive: member.isActive,
    });
    setEditingId(member.id);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      name: "",
      position: "",
      imageUrl: "",
      bio: "",
      linkedin: "",
      instagram: "",
      github: "",
      website: "",
      order: teamMembers.length,
      isActive: true,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;

    try {
      const response = await fetch(`/api/admin/cabinet?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTeamMembers(teamMembers.filter((member) => member.id !== id));
      }
    } catch (error) {
      console.error("Error deleting team member:", error);
    }
  };

  const handleReorder = async (id: string, direction: "up" | "down") => {
    const currentIndex = teamMembers.findIndex((member) => member.id === id);
    if (
      (direction === "up" && currentIndex === 0) ||
      (direction === "down" && currentIndex === teamMembers.length - 1)
    ) {
      return;
    }

    const newMembers = [...teamMembers];
    const targetIndex =
      direction === "up" ? currentIndex - 1 : currentIndex + 1;

    // Swap the members
    [newMembers[currentIndex], newMembers[targetIndex]] = [
      newMembers[targetIndex],
      newMembers[currentIndex],
    ];

    // Update order values
    newMembers.forEach((member, index) => {
      member.order = index;
    });

    setTeamMembers(newMembers);

    // Update in database
    try {
      await fetch("/api/admin/cabinet/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          members: newMembers.map((member) => ({
            id: member.id,
            order: member.order,
          })),
        }),
      });
    } catch (error) {
      console.error("Error reordering team members:", error);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsDialogOpen(false);
    setFormData({
      name: "",
      position: "",
      imageUrl: "",
      bio: "",
      linkedin: "",
      instagram: "",
      github: "",
      website: "",
      order: 0,
      isActive: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          Team Members ({teamMembers.length})
        </h2>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      {/* Modal Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Team Member" : "Add New Team Member"}
            </DialogTitle>
            <DialogDescription>
              {editingId
                ? "Update the team member details"
                : "Add a new member to the cabinet"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                  placeholder="e.g., President, Vice President"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio (Optional)</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                placeholder="Brief description about the team member"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    order: parseInt(e.target.value) || 0,
                  })
                }
                min="0"
              />
            </div>

            <CabinetImageUpload
              value={formData.imageUrl}
              onChange={(url) => setFormData({ ...formData, imageUrl: url })}
              onRemove={() => setFormData({ ...formData, imageUrl: "" })}
            />

            <div className="space-y-4">
              <Label className="text-base font-semibold">
                Social Links (Optional)
              </Label>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4 text-blue-600" />
                    LinkedIn
                  </Label>
                  <Input
                    id="linkedin"
                    value={formData.linkedin}
                    onChange={(e) =>
                      setFormData({ ...formData, linkedin: e.target.value })
                    }
                    placeholder="https://linkedin.com/in/username or www.linkedin.com/in/username"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="instagram"
                    className="flex items-center gap-2"
                  >
                    <Instagram className="h-4 w-4 text-pink-600" />
                    Instagram
                  </Label>
                  <Input
                    id="instagram"
                    value={formData.instagram}
                    onChange={(e) =>
                      setFormData({ ...formData, instagram: e.target.value })
                    }
                    placeholder="https://instagram.com/username or www.instagram.com/username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="github" className="flex items-center gap-2">
                    <Github className="h-4 w-4 text-gray-600" />
                    GitHub
                  </Label>
                  <Input
                    id="github"
                    value={formData.github}
                    onChange={(e) =>
                      setFormData({ ...formData, github: e.target.value })
                    }
                    placeholder="https://github.com/username or github.com/username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-green-600" />
                    Website/Portfolio
                  </Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                    placeholder="https://yourwebsite.com or www.yourwebsite.com"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isActive: checked })
                }
              />
              <Label htmlFor="isActive">Active</Label>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={cancelEdit}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                {editingId ? "Update" : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member, index) => (
          <Card
            key={member.id}
            className={!member.isActive ? "opacity-60" : ""}
          >
            <CardContent className="p-4">
              <div className="text-center">
                {/* Profile Image */}
                <div className="relative mx-auto mb-4 w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20">
                  {member.imageUrl ? (
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary/50" />
                    </div>
                  )}
                </div>

                <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                <p className="text-sm text-primary font-medium mb-2">
                  {member.position}
                </p>

                {member.bio && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                    {member.bio}
                  </p>
                )}

                {/* Social Links Preview */}
                <div className="flex items-center justify-center gap-1 mb-3">
                  {member.linkedin && (
                    <Linkedin className="h-3 w-3 text-blue-600" />
                  )}
                  {member.instagram && (
                    <Instagram className="h-3 w-3 text-pink-600" />
                  )}
                  {member.github && (
                    <Github className="h-3 w-3 text-gray-600" />
                  )}
                  {member.website && (
                    <Globe className="h-3 w-3 text-green-600" />
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      member.isActive
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    }`}
                  >
                    {member.isActive ? "Active" : "Inactive"}
                  </span>

                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReorder(member.id, "up")}
                      disabled={index === 0}
                    >
                      <ArrowUp className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReorder(member.id, "down")}
                      disabled={index === teamMembers.length - 1}
                    >
                      <ArrowDown className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(member)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(member.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
