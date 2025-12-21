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
  ArrowUp,
  ArrowDown,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import { ImageUpload } from "./image-upload";

type Achievement = {
  id: string;
  title: string;
  description: string;
  year: string;
  imageUrl: string | null;
  buttonText: string | null;
  buttonUrl: string | null;
  buttonEnabled: boolean;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type AchievementManagerProps = {
  initialAchievements: Achievement[];
};

export function AchievementManager({
  initialAchievements,
}: AchievementManagerProps) {
  const [achievements, setAchievements] = useState(initialAchievements);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    year: new Date().getFullYear().toString(),
    imageUrl: "",
    buttonText: "",
    buttonUrl: "",
    buttonEnabled: false,
    order: 0,
    isActive: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/admin/achievements", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          editingId ? { ...formData, id: editingId } : formData
        ),
      });

      if (response.ok) {
        const updatedAchievement = await response.json();

        if (editingId) {
          setAchievements(
            achievements.map((achievement) =>
              achievement.id === editingId ? updatedAchievement : achievement
            )
          );
          setEditingId(null);
        } else {
          setAchievements([...achievements, updatedAchievement]);
        }

        setIsDialogOpen(false);
        setFormData({
          title: "",
          description: "",
          year: new Date().getFullYear().toString(),
          imageUrl: "",
          buttonText: "",
          buttonUrl: "",
          buttonEnabled: false,
          order: 0,
          isActive: true,
        });
      }
    } catch (error) {
      console.error("Error saving achievement:", error);
    }
  };

  const handleEdit = (achievement: Achievement) => {
    setFormData({
      title: achievement.title,
      description: achievement.description,
      year: achievement.year,
      imageUrl: achievement.imageUrl || "",
      buttonText: achievement.buttonText || "",
      buttonUrl: achievement.buttonUrl || "",
      buttonEnabled: achievement.buttonEnabled,
      order: achievement.order,
      isActive: achievement.isActive,
    });
    setEditingId(achievement.id);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      year: new Date().getFullYear().toString(),
      imageUrl: "",
      buttonText: "",
      buttonUrl: "",
      buttonEnabled: false,
      order: achievements.length,
      isActive: true,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this achievement?")) return;

    try {
      const response = await fetch(`/api/admin/achievements?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setAchievements(
          achievements.filter((achievement) => achievement.id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting achievement:", error);
    }
  };

  const handleReorder = async (id: string, direction: "up" | "down") => {
    const currentIndex = achievements.findIndex(
      (achievement) => achievement.id === id
    );
    if (
      (direction === "up" && currentIndex === 0) ||
      (direction === "down" && currentIndex === achievements.length - 1)
    ) {
      return;
    }

    const newAchievements = [...achievements];
    const targetIndex =
      direction === "up" ? currentIndex - 1 : currentIndex + 1;

    // Swap the achievements
    [newAchievements[currentIndex], newAchievements[targetIndex]] = [
      newAchievements[targetIndex],
      newAchievements[currentIndex],
    ];

    // Update order values
    newAchievements.forEach((achievement, index) => {
      achievement.order = index;
    });

    setAchievements(newAchievements);

    // Update in database
    try {
      await fetch("/api/admin/achievements/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          achievements: newAchievements.map((achievement) => ({
            id: achievement.id,
            order: achievement.order,
          })),
        }),
      });
    } catch (error) {
      console.error("Error reordering achievements:", error);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsDialogOpen(false);
    setFormData({
      title: "",
      description: "",
      year: new Date().getFullYear().toString(),
      imageUrl: "",
      buttonText: "",
      buttonUrl: "",
      buttonEnabled: false,
      order: 0,
      isActive: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          Achievements ({achievements.length})
        </h2>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Achievement
        </Button>
      </div>

      {/* Modal Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Achievement" : "Add New Achievement"}
            </DialogTitle>
            <DialogDescription>
              {editingId
                ? "Update the achievement details"
                : "Create a new achievement"}
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
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({ ...formData, year: e.target.value })
                  }
                  placeholder="e.g., 2024"
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
                placeholder="Description of the achievement"
                rows={3}
                required
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
                      placeholder="e.g., View Certificate, Learn More"
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
        {achievements.map((achievement, index) => (
          <Card
            key={achievement.id}
            className={!achievement.isActive ? "opacity-60" : ""}
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Image */}
                {achievement.imageUrl && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                    <Image
                      src={achievement.imageUrl}
                      alt={achievement.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Year */}
                <div className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full w-fit">
                  {achievement.year}
                </div>

                {/* Title */}
                <h3 className="font-semibold text-lg line-clamp-2">
                  {achievement.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                  {achievement.description}
                </p>

                {/* Button Preview */}
                {achievement.buttonEnabled && achievement.buttonText && (
                  <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400">
                    <ExternalLink className="h-3 w-3" />
                    <span>Button: {achievement.buttonText}</span>
                  </div>
                )}

                {/* Status and Actions */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      achievement.isActive
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    }`}
                  >
                    {achievement.isActive ? "Active" : "Inactive"}
                  </span>

                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReorder(achievement.id, "up")}
                      disabled={index === 0}
                    >
                      <ArrowUp className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReorder(achievement.id, "down")}
                      disabled={index === achievements.length - 1}
                    >
                      <ArrowDown className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(achievement)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(achievement.id)}
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
