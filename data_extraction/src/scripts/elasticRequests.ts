import { Client } from "@elastic/elasticsearch";

const client = new Client({
  node: "http://localhost:9200",
});

export async function bulkIndexDocuments(index: string, documents: any[]) {
  const BULK_REQUEST_SIZE = 1000;

  try {
    for (let i = 0; i < documents.length; i += BULK_REQUEST_SIZE) {
      const batch = documents.slice(i, i + BULK_REQUEST_SIZE);
      const body = batch.flatMap((doc) => [
        { index: { _index: index, _id: doc.id } },
        doc,
      ]);

      const bulkResponse = await client.bulk({ refresh: true, body });

      if (bulkResponse.errors) {
        console.error("Bulk indexing errors: ", bulkResponse.items);
      } else {
        console.log(
          `Bulk indexing successful for ${batch.length} documents in index: ${index}`
        );
      }
    }
  } catch (error) {
    console.error("Error during bulk indexing:", error);
  }
}

export async function createIndexWithMappings(index: string, mappings: any) {
  try {
    const exists = await client.indices.exists({ index });

    if (exists) {
      console.log(`Indice: '${index}' already exists.`);
      return;
    }

    await client.indices.create(
      {
        index: index,
        body: {
          mappings,
        },
      },
      { ignore: [400] }
    );

    console.log(`Indice ${index} created with mappings.`);
  } catch (error) {
    console.error("Error creating the mappings: ", error);
  }
}

export async function deleteIndex(index: string) {
  try {
    const exists = await client.indices.exists({ index });

    if (!exists) {
      console.log(`Índice: ${index} does not exist.`);
      return;
    }

    const deleteResponse = await client.indices.delete({ index });

    console.log(`Indice: ${index} deleted successfully.`);
    console.log(deleteResponse);
  } catch (error) {
    console.error("Error deleting indice: ", error);
  }
}
