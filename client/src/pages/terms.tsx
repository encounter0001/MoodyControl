import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto prose prose-invert">
          <h1 className="text-5xl font-display font-black mb-8 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Terms of Service
          </h1>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Acceptance of Terms</h2>
            <p className="text-gray-400">
              By accessing and using Moody Music Bot, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Use License</h2>
            <p className="text-gray-400">
              Permission is granted to temporarily download one copy of the materials (information or software) on Moody Music Bot for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display</li>
              <li>Attempting to decompile or reverse engineer any software contained on the site</li>
              <li>Removing any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Disclaimer</h2>
            <p className="text-gray-400">
              The materials on Moody Music Bot are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Limitations</h2>
            <p className="text-gray-400">
              In no event shall Moody Music Bot or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Moody Music Bot.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
            <p className="text-gray-400">
              If you have any questions about these Terms of Service, please contact us through our support server.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
