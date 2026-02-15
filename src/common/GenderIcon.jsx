import { Mars, User, Venus } from "lucide-react";

const GenderIcon = ({ gender }) => {
  switch (gender) {
    case "male":
      return <Mars className="w-4 h-4 text-blue-500" />;
    case "female":
      return <Venus className="w-4 h-4 text-pink-500" />;
    case "other":
      return <User className="w-4 h-4 text-gray-400" />;
    default:
      return null;
  }
};

export default GenderIcon;
