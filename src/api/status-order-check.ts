import { PrismaClient, orders_with_latest_status } from '@prisma/client'

const prisma = new PrismaClient()

// Simule la récupération d'une liste de commandes à vérifier
async function fetchOrdersToCheck(): Promise<orders_with_latest_status[]> {
  // Cet exemple retourne toutes les commandes where order_status == 'open'
  return await prisma.orders_with_latest_status.findMany({
    where: { order_status: 'open' },
  })
}

// Simule la vérification du statut d'une commande spécifique
async function checkOrderStatus(order: orders_with_latest_status): Promise<'open' | 'expired'> {
  // Cet exemple vérifie si la commande a expiré
  const now = new Date()
  if (now > order.expiry_datetime) {
    return 'expired'
  } else {
    return 'open'
  }
}

// Fonction pour mettre à jour le statut d'une commande dans la base de données
async function updateOrderStatus(nonce: string, newStatus: 'open' | 'filled' | 'expired' | 'cancelled'): Promise<void> {
  await prisma.orders_with_latest_status.update({
    where: { nonce: nonce },
    data: { order_status: newStatus },
  })
}

// Fonction principale pour vérifier et mettre à jour le statut de toutes les commandes
export async function checkAndUpdateAllOrderStatuses(): Promise<void> {
  const orders = await fetchOrdersToCheck()
  for (const order of orders) {
    const newStatus = await checkOrderStatus(order)
    await updateOrderStatus(order.nonce, newStatus)
    console.log(`Order ${order.nonce} updated to status: ${newStatus}`)
  }
}
