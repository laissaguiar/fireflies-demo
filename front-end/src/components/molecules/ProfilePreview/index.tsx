import CustomButton from "@/components/atoms/CustomButton";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

interface ProfilePreviewProps {
  img?: any;
  name?: string;
}

const ProfilePreview = ({ img, name }: ProfilePreviewProps) => {
  return (
    <Box display="flex" mb={2} p={2}>
      <Image
        style={{ borderRadius: "100px" }}
        src={img}
        width={100}
        height={100}
        alt="Picture of the author"
      />
      <Box pl={2} display="flex" flexDirection="column" justifyContent="center">
        <Typography fontWeight={700} pb="8px">
          {name}
        </Typography>
        <CustomButton variant="contained" title="Edit profile" />
      </Box>
    </Box>
  );
};

export default ProfilePreview;
