import { motion } from "framer-motion";

export default function JMeter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto px-8 py-16"
    >
      <h1 className="text-4xl font-bold mb-8">Apache JMeter</h1>

      <p className="text-slate-600 leading-relaxed">
        (Paste introduction from your document here)
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Key Features
      </h2>

      <ul className="list-disc pl-6 space-y-2 text-slate-600">
        <li>Feature 1</li>
        <li>Feature 2</li>
        <li>Feature 3</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Advantages
      </h2>

      <p className="text-slate-600">
        (More content from doc)
      </p>
    </motion.div>
  );
}
