import { getPrismaClient } from "../prisma-client";

const prisma = getPrismaClient();

export async function cleanUpClosedOrders() {
  try {
    // Sélectionner tous les ordres non ouverts de la table orders_with_latest_status
    const closedOrders = await prisma.orders_with_latest_status.findMany({
      where: {
        NOT: {
          order_status: 'open',
        },
      },
    });

    console.log(`Found ${closedOrders.length} closed orders to clean up.`);

    // Pour chaque ordre fermé, supprimer les entrées correspondantes dans les deux tables
    for (const order of closedOrders) {
      const { nonce } = order;

      // Suppression dans orders_v4_nfts
      await prisma.orders_v4_nfts.deleteMany({
        where: { nonce },
      });

      // Suppression dans orders_with_latest_status
      await prisma.orders_with_latest_status.deleteMany({
        where: { nonce },
      });

      console.log(`Cleaned up order with nonce: ${nonce}`);
    }
  } catch (error) {
    console.error("Error cleaning up closed orders:", error);
  }
}
