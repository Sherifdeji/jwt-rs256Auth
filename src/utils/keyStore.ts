export const keys: Record<string, { privateKey: string; publicKey: string }> = {
  "key-2025-04": {
    privateKey: process.env.PRIVATE_KEY_2025_04?.replace(/\\n/g, "\n")!,
    publicKey: process.env.PUBLIC_KEY_2025_04?.replace(/\\n/g, "\n")!,
  },
};

export const currentKid = "key-2025-04";
