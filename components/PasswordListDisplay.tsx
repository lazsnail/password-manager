"use client";

import PasswordDisplay from "@/components/PasswordDisplay";
import PasswordEdit from "@/components/PasswordEdit";
import { useState } from "react";

type PasswordListDisplayProps = {
  passwords: Password[];
};

export default function PasswordListDisplay({
  passwords,
}: PasswordListDisplayProps) {
  var [currentPassword, setCurrentPassword] = useState<Password>(passwords[0]);
  var [edit, setEdit] = useState(false);
  const length = passwords.length;
  console.log(length);

  return (
    <div>
      {edit ? (
        <PasswordEdit password={currentPassword} setEdit={setEdit} />
      ) : null}
      {passwords?.map((password) => (
        <PasswordDisplay
          key={password.id}
          password={password}
          setCurrentPassword={setCurrentPassword}
          setEdit={setEdit}
        />
      ))}
      {length === 0 ? (
        <div className="w-full h-96 flex justify-center items-center">
         <h1>Add your first password</h1>
        </div> 
      ) : null}
    </div>
  );
}
