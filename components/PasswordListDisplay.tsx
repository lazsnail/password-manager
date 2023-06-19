"use client";

import PasswordDisplay from "@/components/PasswordDisplay";
import PasswordEdit from "@/components/PasswordEdit";
import { useState } from "react";

type PasswordListDisplayProps = {
    passwords: Password[];
}

export default function PasswordListDisplay({passwords} : PasswordListDisplayProps) {
  var [currentPassword, setCurrentPassword] = useState<Password>(passwords[0]);
  var [edit, setEdit] = useState(false);

  return (
    <div>
        {edit ? <PasswordEdit password={currentPassword} setEdit={setEdit}/> : null}
        {passwords?.map((password) => (
            <PasswordDisplay key={password.id} password={password} setCurrentPassword={setCurrentPassword} setEdit={setEdit} />
        ))}
    </div>
  );
}
