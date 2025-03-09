import MintNFT from "@/components/MintNFT";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-blue-950 py-12 px-4 flex flex-col items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>
      
      {/* Header */}
      <div className="text-center mb-8 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-3">
          Exclusive NFT Collection
        </h1>
        <p className="text-blue-300 max-w-xl mx-auto">
          Get your hands on the most sought-after digital collectibles on the blockchain
        </p>
      </div>
      
      {/* Main component */}
      <MintNFT />
      
      {/* Footer */}
      <div className="mt-12 text-center text-blue-400/60 text-sm">
        <p>© 2025 Premium NFT Collection. All rights reserved.</p>
      </div>
    </div>
  );
}