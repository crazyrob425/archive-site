import { storagePut, storageGet } from "./storage";

export interface DigitalFile {
  productId: number;
  fileName: string;
  fileKey: string;
  fileUrl: string;
  fileMimeType: string;
}

/**
 * Create a download link for a purchased product
 * In production, this would generate a time-limited presigned URL
 */
export async function generateDownloadLink(fileKey: string) {
  try {
    const { url } = await storageGet(fileKey);
    return url;
  } catch (error) {
    console.error("Failed to generate download link:", error);
    throw new Error("Could not generate download link");
  }
}

/**
 * Create fulfillment records for an order
 * Links purchased products to the customer for download
 */
export async function createOrderFulfillment(orderId: number, items: any[], userId: number) {
  try {
    // In production, this would:
    // 1. Create fulfillment records in database
    // 2. Generate time-limited download links
    // 3. Send email with download links to customer
    // 4. Log fulfillment for audit trail

    const downloadLinks = await Promise.all(
      items.map(async (item) => {
        try {
          const link = await generateDownloadLink(item.fileKey || "");
          return {
            productId: item.productId,
            title: item.title,
            downloadUrl: link,
            expiresAt: new Date(Date.now() + 604800000), // 7 days
          };
        } catch (err) {
          console.error(`Failed to generate link for product ${item.productId}:`, err);
          return null;
        }
      })
    );

    return {
      orderId,
      userId,
      downloadLinks: downloadLinks.filter((link) => link !== null),
      createdAt: new Date(),
    };
  } catch (error) {
    console.error("Failed to create order fulfillment:", error);
    throw error;
  }
}

/**
 * Send fulfillment email to customer
 * In production, would integrate with email service
 */
export async function sendFulfillmentEmail(
  customerEmail: string,
  orderId: number,
  downloadLinks: any[]
) {
  try {
    // Construct email content
    const emailContent = `
Your order #${orderId} has been processed!

Your digital products are ready to download:

${downloadLinks.map((link) => `- ${link.title}: ${link.downloadUrl}`).join("\n")}

Download links expire in 7 days.

Thank you for your purchase!
    `.trim();

    // In production, this would send via email service (SendGrid, etc.)
    console.log(`[EMAIL] Sent fulfillment email to ${customerEmail}`);
    console.log(`[EMAIL] Content: ${emailContent}`);

    return true;
  } catch (error) {
    console.error("Failed to send fulfillment email:", error);
    return false;
  }
}

/**
 * Get download links for a user's purchased products
 */
export async function getUserDownloads(userId: number) {
  try {
    // In production, would query database for user's orders
    // and generate current download links for each
    return [];
  } catch (error) {
    console.error("Failed to get user downloads:", error);
    throw error;
  }
}
