import { prisma } from "@/lib/prisma";
import { FieldManager } from "@/components/admin/field-manager";

// Force dynamic rendering
export const dynamic = "force-dynamic";

async function getFields() {
  return prisma.field.findMany({
    orderBy: { order: "asc" },
  });
}

export default async function FieldsPage() {
  const fields = await getFields();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Fields of Expertise
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage the company's areas of expertise and services
        </p>
      </div>

      <FieldManager initialFields={fields} />
    </div>
  );
}
