import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto prose prose-invert">
          <h1 className="text-5xl font-display font-black mb-8 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
            <p className="text-gray-400">
              Moody Music Bot ("we", "us", "our" or "Company") operates the service. This page informs you of our privacy practices regarding the collection, use, and disclosure of personal data when you use our service and the choices you have associated with that data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Information Collection</h2>
            <p className="text-gray-400">
              We collect information you provide directly to us, such as when you connect your Discord account. This may include your Discord user ID, username, and server information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">How We Use Information</h2>
            <p className="text-gray-400">
              We use the information we collect to provide, maintain, and improve our services. We use your Discord information to authenticate you and manage your guild settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Security</h2>
            <p className="text-gray-400">
              The security of your personal information is important to us. We implement appropriate technical and organizational measures to protect your personal information against unauthorized access.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-gray-400">
              If you have any questions about this Privacy Policy, please contact us through our support server.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
