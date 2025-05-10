export const keys: Record<string, { privateKey: string; publicKey: string }> = {
  "key-2025-04": {
    // Replace escaped newline characters with actual newlines for proper PEM formatting
    privateKey: process.env.PRIVATE_KEY_2025_04?.replace(/\\n/g, "\n")!,
    publicKey: process.env.PUBLIC_KEY_2025_04?.replace(/\\n/g, "\n")!,
  },
};

// The current key ID (kid) used for signing and verifying tokens
export const currentKid = "key-2025-04";
