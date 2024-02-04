interface PostDetails {
  characterCount: number;
  remainingSpace: number;
  progressPercentage: number;
  counterClasses: string;
  showNumber: boolean;
  isButtonDisabled: boolean;
  postStyle: React.CSSProperties;
}

export const calculateColorAndClass = (
  remainingSpace: number,
): {
  colorClass: string;
  color: string;
} => {
  if (remainingSpace <= 0) {
    return {
      colorClass: remainingSpace === -1 ? "text-red-700" : "text-red-500",
      color: remainingSpace <= -1 ? "#B91C1C" : "#FF4500",
    };
  } else if (remainingSpace <= 25) {
    return {
      colorClass: "text-red-500",
      color: "#FF4500",
    };
  } else if (remainingSpace <= 50) {
    return {
      colorClass: "text-yellow-500",
      color: "#FFD700",
    };
  }
  return {
    colorClass: "text-gray-800",
    color: "#00BFFF",
  };
};

export const getProgressPercentage = (characterCount: number): number => {
  return characterCount <= 190 ? (characterCount / 190) * 100 : 100;
};

export const calculatePostStyle = (
  progressPercentage: number,
  remainingSpace: number,
): React.CSSProperties => {
  const { color } = calculateColorAndClass(remainingSpace);

  return {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    background: `conic-gradient(from 0deg at 50% 50%, ${color} ${progressPercentage}%, #eee ${progressPercentage}% 100%)`,
    color: "#fff",
  };
};

export const calculatePostDetails = (
  formikValues: { postContent: string },
  isLoading: boolean,
): PostDetails => {
  const characterCount = formikValues.postContent.length;
  const remainingSpace = 190 - characterCount;
  const progressPercentage = getProgressPercentage(characterCount);
  const { colorClass } = calculateColorAndClass(remainingSpace);
  const showNumber = remainingSpace <= 50 && remainingSpace > -190;
  const isButtonDisabled =
    characterCount === 0 || characterCount > 190 || isLoading;

  const postStyle = calculatePostStyle(progressPercentage, remainingSpace);

  return {
    characterCount,
    remainingSpace,
    progressPercentage,
    counterClasses: colorClass,
    showNumber,
    isButtonDisabled,
    postStyle,
  };
};
