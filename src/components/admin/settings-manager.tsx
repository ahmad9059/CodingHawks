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
import { Plus, Edit, Trash2, Save, X, Settings } from "lucide-react";

type SiteSetting = {
  id: string;
  key: string;
  value: string;
  type: string;
};

type SettingsManagerProps = {
  initialSettings: SiteSetting[];
};

const SETTING_TYPES = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "boolean", label: "Boolean" },
  { value: "json", label: "JSON" },
  { value: "url", label: "URL" },
  { value: "email", label: "Email" },
];

const PREDEFINED_SETTINGS = [
  { key: "site_title", label: "Site Title", type: "text" },
  { key: "site_description", label: "Site Description", type: "text" },
  { key: "contact_email", label: "Contact Email", type: "email" },
  { key: "contact_phone", label: "Contact Phone", type: "text" },
  { key: "social_facebook", label: "Facebook URL", type: "url" },
  { key: "social_twitter", label: "Twitter URL", type: "url" },
  { key: "social_linkedin", label: "LinkedIn URL", type: "url" },
  { key: "social_instagram", label: "Instagram URL", type: "url" },
  { key: "hero_title", label: "Hero Section Title", type: "text" },
  { key: "hero_subtitle", label: "Hero Section Subtitle", type: "text" },
  { key: "about_title", label: "About Section Title", type: "text" },
  {
    key: "about_description",
    label: "About Section Description",
    type: "text",
  },
  { key: "maintenance_mode", label: "Maintenance Mode", type: "boolean" },
];

export function SettingsManager({ initialSettings }: SettingsManagerProps) {
  const [settings, setSettings] = useState(initialSettings);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    key: "",
    value: "",
    type: "text",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/admin/settings", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          editingId ? { ...formData, id: editingId } : formData
        ),
      });

      if (response.ok) {
        const updatedSetting = await response.json();

        if (editingId) {
          setSettings(
            settings.map((setting) =>
              setting.id === editingId ? updatedSetting : setting
            )
          );
          setEditingId(null);
        } else {
          setSettings([...settings, updatedSetting]);
          setShowAddForm(false);
        }

        setFormData({
          key: "",
          value: "",
          type: "text",
        });
      }
    } catch (error) {
      console.error("Error saving setting:", error);
    }
  };

  const handleEdit = (setting: SiteSetting) => {
    setFormData({
      key: setting.key,
      value: setting.value,
      type: setting.type,
    });
    setEditingId(setting.id);
    setShowAddForm(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this setting?")) return;

    try {
      const response = await fetch(`/api/admin/settings?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSettings(settings.filter((setting) => setting.id !== id));
      }
    } catch (error) {
      console.error("Error deleting setting:", error);
    }
  };

  const handleQuickAdd = (
    predefinedSetting: (typeof PREDEFINED_SETTINGS)[0]
  ) => {
    const existingSetting = settings.find(
      (s) => s.key === predefinedSetting.key
    );
    if (existingSetting) {
      handleEdit(existingSetting);
      return;
    }

    setFormData({
      key: predefinedSetting.key,
      value: "",
      type: predefinedSetting.type,
    });
    setShowAddForm(true);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({
      key: "",
      value: "",
      type: "text",
    });
  };

  const renderValueInput = () => {
    switch (formData.type) {
      case "boolean":
        return (
          <div className="flex items-center space-x-2">
            <Switch
              id="value"
              checked={formData.value === "true"}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, value: checked.toString() })
              }
            />
            <Label htmlFor="value">Enabled</Label>
          </div>
        );
      case "json":
        return (
          <Textarea
            id="value"
            value={formData.value}
            onChange={(e) =>
              setFormData({ ...formData, value: e.target.value })
            }
            placeholder='{"key": "value"}'
            rows={4}
            required
          />
        );
      default:
        return (
          <Input
            id="value"
            type={
              formData.type === "number"
                ? "number"
                : formData.type === "email"
                ? "email"
                : formData.type === "url"
                ? "url"
                : "text"
            }
            value={formData.value}
            onChange={(e) =>
              setFormData({ ...formData, value: e.target.value })
            }
            required
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Settings ({settings.length})</h2>
        <Button
          onClick={() => setShowAddForm(true)}
          disabled={showAddForm || editingId !== null}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Setting
        </Button>
      </div>

      {/* Quick Add Predefined Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Add Common Settings</CardTitle>
          <CardDescription>
            Click to add or edit common site settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {PREDEFINED_SETTINGS.map((predefined) => {
              const exists = settings.some((s) => s.key === predefined.key);
              return (
                <Button
                  key={predefined.key}
                  variant={exists ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => handleQuickAdd(predefined)}
                  disabled={editingId !== null || showAddForm}
                >
                  {exists ? "Edit" : "Add"} {predefined.label}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {(showAddForm || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingId ? "Edit Setting" : "Add New Setting"}
            </CardTitle>
            <CardDescription>
              {editingId
                ? "Update the setting details"
                : "Create a new site setting"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="key">Key</Label>
                  <Input
                    id="key"
                    value={formData.key}
                    onChange={(e) =>
                      setFormData({ ...formData, key: e.target.value })
                    }
                    placeholder="setting_key"
                    disabled={!!editingId}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) =>
                      setFormData({ ...formData, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SETTING_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="value">Value</Label>
                {renderValueInput()}
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

      <div className="grid gap-4">
        {settings.map((setting) => (
          <Card key={setting.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-gray-500" />
                    <h3 className="font-semibold">{setting.key}</h3>
                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                      {setting.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 break-all">
                    {setting.type === "boolean"
                      ? setting.value === "true"
                        ? "Enabled"
                        : "Disabled"
                      : setting.value}
                  </p>
                </div>

                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(setting)}
                    disabled={editingId === setting.id || showAddForm}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(setting.id)}
                    disabled={editingId !== null || showAddForm}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
