import { Avatar } from "@mui/material";
import { useState } from "react";
import MenuAuthed from "./MenuAuthed";

export default function UserAvatar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <div onClick={handleClick}>
        <Avatar />
      </div>
      <MenuAuthed
        open={open}
        anchor={anchorEl}
        setAnchor={setAnchorEl}
      ></MenuAuthed>
    </>
  );
}
