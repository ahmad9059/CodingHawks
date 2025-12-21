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
  Megaphone,
  Calendar,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import { ImageUpload } from "./image-upload";
import { format } from "date-fns";

type Announcement = {
  id: string;
  title: string;
  description: string;
  content: string | null;
  imageUrl: string | null;
  date: Date;
  buttonText: string | null;
  buttonUrl: string | null;
  buttonEnabled: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type AnnouncementManagerProps = {
  initialAnnouncements: Announcement[];
};

export function AnnouncementManager({
  initialAnnouncements,
}: AnnouncementManagerProps) {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    imageUrl: "",
    date: new Date().toISOString().split("T")[0],
    buttonText: "",
    buttonUrl: "",
    buttonEnabled: false,
    isActive: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/admin/announcements", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          editingId ? { ...formData, id: editingId } : formData
        ),
      });

      if (response.ok) {
        const updatedAnnouncement = await response.json();

        if (editingId) {
          setAnnouncements(
            announcements.map((announcement) =>
              announcement.id === editingId ? updatedAnnouncement : announcement
            )
          );
          setEditingId(null);
        } else {
          setAnnouncements([updatedAnnouncement, ...announcements]);
        }

        setIsDialogOpen(false);
        setFormData({
          title: "",
          description: "",
          content: "",
          imageUrl: "",
          date: new Date().toISOString().split("T")[0],
          buttonText: "",
          buttonUrl: "",
          buttonEnabled: false,
          isActive: true,
        });
      }
    } catch (error) {
      console.error("Error saving announcement:", error);
    }
  };

  const handleEdit = (announcement: Announcement) => {
    setFormData({
      title: announcement.title,
      description: announcement.description,
      content: announcement.content || "",
      imageUrl: announcement.imageUrl || "",
      date: new Date(announcement.date).toISOString().split("T")[0],
      buttonText: announcement.buttonText || "",
      buttonUrl: announcement.buttonUrl || "",
      buttonEnabled: announcement.buttonEnabled,
      isActive: announcement.isActive,
    });
    setEditingId(announcement.id);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      content: "",
      imageUrl: "",
      date: new Date().toISOString().split("T")[0],
      buttonText: "",
      buttonUrl: "",
      buttonEnabled: false,
      isActive: true,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;

    try {
      const response = await fetch(`/api/admin/announcements?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setAnnouncements(
          announcements.filter((announcement) => announcement.id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsDialogOpen(false);
    setFormData({
      title: "",
      description: "",
      content: "",
      imageUrl: "",
      date: new Date().toISOString().split("T")[0],
      buttonText: "",
      buttonUrl: "",
      buttonEnabled: false,
      isActive: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          Announcements ({announcements.length})
        </h2>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Announcement
        </Button>
      </div>

      {/* Modal Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Announcement" : "Add New Announcement"}
            </DialogTitle>
            <DialogDescription>
              {editingId
                ? "Update the announcement details"
                : "Create a new announcement"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Brief description for the card"
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content (Optional)</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder="Full content for the detail page"
                rows={5}
              />
            </div>

            <ImageUpload
              value={formData.imageUrl}
              onChange={(url) => setFormData({ ...formData, imageUrl: url })}
              onRemove={() => setFormData({ ...formData, imageUrl: "" })}
            />

            <div className="space-y-4 border-t pt-4">
              <Label className="text-base font-semibold flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Custom Button (Optional)
              </Label>

              <div className="flex items-center space-x-2">
                <Switch
                  id="buttonEnabled"
                  checked={formData.buttonEnabled}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, buttonEnabled: checked })
                  }
                />
                <Label htmlFor="buttonEnabled">Enable Custom Button</Label>
              </div>

              {formData.buttonEnabled && (
                <div className="grid grid-cols-2 gap-4 pl-6 border-l-2 border-primary/20">
                  <div className="space-y-2">
                    <Label htmlFor="buttonText">Button Text</Label>
                    <Input
                      id="buttonText"
                      value={formData.buttonText}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          buttonText: e.target.value,
                        })
                      }
                      placeholder="e.g., Learn More, Register Now"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="buttonUrl">Button URL</Label>
                    <Input
                      id="buttonUrl"
                      value={formData.buttonUrl}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          buttonUrl: e.target.value,
                        })
                      }
                      placeholder="https://example.com or www.example.com"
                    />
                  </div>
                </div>
              )}
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
        {announcements.map((announcement) => (
          <Card
            key={announcement.id}
            className={!announcement.isActive ? "opacity-60" : ""}
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Image */}
                {announcement.imageUrl && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                    <Image
                      src={announcement.imageUrl}
                      alt={announcement.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(announcement.date), "MMM d, yyyy")}
                </div>

                {/* Title */}
                <h3 className="font-semibold text-lg line-clamp-2">
                  {announcement.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                  {announcement.description}
                </p>

                {/* Button Preview */}
                {announcement.buttonEnabled && announcement.buttonText && (
                  <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400">
                    <ExternalLink className="h-3 w-3" />
                    <span>Button: {announcement.buttonText}</span>
                  </div>
                )}

                {/* Status and Actions */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      announcement.isActive
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    }`}
                  >
                    {announcement.isActive ? "Active" : "Inactive"}
                  </span>

                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(announcement)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(announcement.id)}
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
