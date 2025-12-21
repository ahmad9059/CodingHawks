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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit, Trash2, Save, X, ArrowUp, ArrowDown } from "lucide-react";
import * as LucideIcons from "lucide-react";

type Field = {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type FieldManagerProps = {
  initialFields: Field[];
};

// Common Lucide icons for fields
const COMMON_ICONS = [
  "Code",
  "Smartphone",
  "Globe",
  "Database",
  "Cloud",
  "Shield",
  "Zap",
  "Cpu",
  "Monitor",
  "Server",
  "Wifi",
  "Settings",
  "Tool",
  "Layers",
  "Box",
  "Grid",
  "Palette",
  "Camera",
  "Video",
  "Headphones",
  "Mic",
  "Users",
  "Target",
  "TrendingUp",
];

export function FieldManager({ initialFields }: FieldManagerProps) {
  const [fields, setFields] = useState(initialFields);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "Code",
    order: 0,
    isActive: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/admin/fields", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          editingId ? { ...formData, id: editingId } : formData
        ),
      });

      if (response.ok) {
        const updatedField = await response.json();

        if (editingId) {
          setFields(
            fields.map((field) =>
              field.id === editingId ? updatedField : field
            )
          );
          setEditingId(null);
        } else {
          setFields([...fields, updatedField]);
          setShowAddForm(false);
        }

        setFormData({
          title: "",
          description: "",
          icon: "Code",
          order: 0,
          isActive: true,
        });
      }
    } catch (error) {
      console.error("Error saving field:", error);
    }
  };

  const handleEdit = (field: Field) => {
    setFormData({
      title: field.title,
      description: field.description,
      icon: field.icon,
      order: field.order,
      isActive: field.isActive,
    });
    setEditingId(field.id);
    setShowAddForm(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this field?")) return;

    try {
      const response = await fetch(`/api/admin/fields?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setFields(fields.filter((field) => field.id !== id));
      }
    } catch (error) {
      console.error("Error deleting field:", error);
    }
  };

  const handleReorder = async (id: string, direction: "up" | "down") => {
    const currentIndex = fields.findIndex((field) => field.id === id);
    if (
      (direction === "up" && currentIndex === 0) ||
      (direction === "down" && currentIndex === fields.length - 1)
    ) {
      return;
    }

    const newFields = [...fields];
    const targetIndex =
      direction === "up" ? currentIndex - 1 : currentIndex + 1;

    // Swap the fields
    [newFields[currentIndex], newFields[targetIndex]] = [
      newFields[targetIndex],
      newFields[currentIndex],
    ];

    // Update order values
    newFields.forEach((field, index) => {
      field.order = index;
    });

    setFields(newFields);

    // Update in database
    try {
      await fetch("/api/admin/fields/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: newFields.map((field) => ({
            id: field.id,
            order: field.order,
          })),
        }),
      });
    } catch (error) {
      console.error("Error reordering fields:", error);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({
      title: "",
      description: "",
      icon: "Code",
      order: 0,
      isActive: true,
    });
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? (
      <IconComponent className="h-5 w-5" />
    ) : (
      <LucideIcons.Code className="h-5 w-5" />
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Fields ({fields.length})</h2>
        <Button
          onClick={() => setShowAddForm(true)}
          disabled={showAddForm || editingId !== null}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Field
        </Button>
      </div>

      {(showAddForm || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Edit Field" : "Add New Field"}</CardTitle>
            <CardDescription>
              {editingId
                ? "Update the field details"
                : "Create a new field of expertise"}
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                  <Label htmlFor="icon">Icon</Label>
                  <Select
                    value={formData.icon}
                    onValueChange={(value) =>
                      setFormData({ ...formData, icon: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {COMMON_ICONS.map((icon) => (
                        <SelectItem key={icon} value={icon}>
                          <div className="flex items-center gap-2">
                            {renderIcon(icon)}
                            {icon}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  placeholder="Describe this field of expertise"
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

              <div className="flex space-x-2">
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  {editingId ? "Update" : "Save"}
                </Button>
                <Button type="button" variant="outline" onClick={cancelEdit}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {fields.map((field, index) => (
          <Card key={field.id} className={!field.isActive ? "opacity-60" : ""}>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                    {renderIcon(field.icon)}
                  </div>
                  <h3 className="font-semibold text-lg">{field.title}</h3>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                  {field.description}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      field.isActive
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    }`}
                  >
                    {field.isActive ? "Active" : "Inactive"}
                  </span>

                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReorder(field.id, "up")}
                      disabled={
                        index === 0 || editingId !== null || showAddForm
                      }
                    >
                      <ArrowUp className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReorder(field.id, "down")}
                      disabled={
                        index === fields.length - 1 ||
                        editingId !== null ||
                        showAddForm
                      }
                    >
                      <ArrowDown className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(field)}
                      disabled={editingId === field.id || showAddForm}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(field.id)}
                      disabled={editingId !== null || showAddForm}
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
