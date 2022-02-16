import React, { FC } from "react";
import { Box } from "@mui/system";

type Props = {
    children: React.ReactNode;
};

const FieldBox: FC<Props> = ({ children }) => (
    <Box margin='5px' padding='5px' display='flex' flexDirection='column'>
        {children}
    </Box>
);

export default FieldBox;
