// src/components/Loader.tsx
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Shield } from 'lucide-react';

const Loader = () => {
  return (
    <div 
      className="flex flex-col justify-center items-center h-screen w-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 z-50 fixed top-0 left-0"
      role="alert"
      aria-live="assertive"
      aria-label="Chargement..."
    >
      <div className="relative">
        {/* Cercle principal avec animation de rotation */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-32 h-32 border-4 border-yellow-400 rounded-full flex items-center justify-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl"
          >
            <DollarSign className="w-12 h-12 text-white" />
          </motion.div>
        </motion.div>

        {/* Icônes flottantes */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8
          }}
          className="absolute -top-4 -right-4 w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center shadow-lg"
        >
          <TrendingUp className="w-8 h-8 text-white" />
        </motion.div>

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
          className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center shadow-lg"
        >
          <Shield className="w-8 h-8 text-white" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <motion.p
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-xl font-semibold text-gray-700 mb-2"
        >
          chargement...
        </motion.p>
        <p className="text-gray-500">
          Vos solutions financières se préparent
        </p>
      </motion.div>
    </div>
  );
};

export default Loader;
