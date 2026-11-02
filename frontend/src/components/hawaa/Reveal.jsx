import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, y = 32, className = "", as = "div" }) => {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </Tag>
  );
};

export const MaskLines = ({ lines, className = "", delay = 0, inView = false }) => (
  <span className={className}>
    {lines.map((line, i) => (
      <span key={i} className="block overflow-hidden pb-[0.08em]">
        <motion.span
          className="block"
          initial={{ y: "110%", rotate: 3 }}
          {...(inView
            ? { whileInView: { y: "0%", rotate: 0 }, viewport: { once: true, amount: 0.1 } }
            : { animate: { y: "0%", rotate: 0 } })}
          transition={{ duration: 1.1, delay: delay + i * 0.12, ease }}
        >
          {line}
        </motion.span>
      </span>
    ))}
  </span>
);
