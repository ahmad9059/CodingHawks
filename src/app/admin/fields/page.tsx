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
    <div>
      <FieldManager initialFields={fields} />
    </div>
  );
}
