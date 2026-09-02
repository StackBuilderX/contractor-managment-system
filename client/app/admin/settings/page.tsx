"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/app/context/UserContext";
import { User, Lock, Bell, Palette, Shield, Save, Mail, Phone, Camera, ChevronRight } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

type SettingsSection =
   | "profile"
   | "security"
   | "notifications"
   | "appearance";



export default function SettingsPage() {
   const [activeSection, setActiveSection] =
      useState<SettingsSection>("profile");

   const [notifications, setNotifications] = useState({
      email: true,
      system: true,
      marketing: false,
   });

   const menu = [
      {
         id: "profile" as SettingsSection,
         label: "Profile",
         description: "Personal information",
         icon: User,
      },
      {
         id: "security" as SettingsSection,
         label: "Security",
         description: "Password & protection",
         icon: Lock,
      },
      {
         id: "notifications" as SettingsSection,
         label: "Notifications",
         description: "Manage notifications",
         icon: Bell,
      },
      {
         id: "appearance" as SettingsSection,
         label: "Appearance",
         description: "Customize your experience",
         icon: Palette,
      },
   ];

   const { user } = useUser();
   const [file, setFile] = useState<string>("");
   const [loading, setLoading] = useState(false);

   const [firstName, setFirstName] = useState<string>("");
   const [lastName, setLastName] = useState<string>("");
   const [email, setEmail] = useState<string>("");
   const [phone, setPhone] = useState<string>("");
   useEffect(() => {
      if (user) {
         setFirstName(user.firstName);
         setLastName(user.lastName);
         setEmail(user.email);
         setPhone(user.phone);
         setFile(user.profileImageUrl);
      }
   }, [user]);

   const updateProfileImage = async (file) => {
      if (!file) {
         return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
         const response = await fetch(`http://localhost:8080/api/users/${user.id}/profile-image`, {
            method: "POST",
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
         });

         if (!response.ok) {
            throw new Error("Failed to update profile image");
            toast.error("Failed to update profile image");
         }

         const data = await response.json();
         setFile(data.profileImageUrl);
         console.log(data);
         toast.success("Profile image updated successfully");


      } catch (error) {
         console.error("Error updating profile image:", error);
         toast.error("Failed to update profile image");
      }




   }

   const partialUpdateUser = async (file) => {
      setLoading(true);
      if (!file) {
         return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
         const response = await fetch(`http://localhost:8080/api/users/${user.id}`, {
            method: "PATCH",
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               firstName: firstName,
               lastName: lastName,
               email: email,
               phone: phone
            })
         });
         if (!response.ok) {
            throw new Error("Failed to update user information");
            toast.error("Failed to update user information");
         }

         const data = await response.json();
         console.log(data);

         setFirstName(data.firstName);
         setLastName(data.lastName);
         setEmail(data.email);
         setPhone(data.phone);

         toast.success("user information updated successfully");

      } catch (error) {
         console.error("Error updating user information:", error);
         toast.error("Failed to update user information");
      } finally {
         setLoading(false);
      }

   }




   return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-8">
         <div className="mx-auto max-w-7xl">

            {/* Header */}
            <div className="mb-8">
               <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  Settings
               </h1>

               <p className="mt-1 text-sm text-slate-500">
                  Manage your account, security and preferences.
               </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">

               {/* Sidebar */}
               <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">

                  {menu.map((item) => {
                     const Icon = item.icon;
                     const active = activeSection === item.id;

                     return (
                        <button
                           key={item.id}
                           onClick={() => setActiveSection(item.id)}
                           className={`mb-1 flex w-full items-center gap-3 rounded-xl p-3 text-left transition ${active
                              ? "bg-indigo-800 text-white shadow-sm"
                              : "text-slate-600 hover:bg-slate-50"
                              }`}
                        >
                           <div
                              className={`flex h-10 w-10 items-center justify-center rounded-lg ${active
                                 ? "bg-white/10"
                                 : "bg-slate-100"
                                 }`}
                           >
                              <Icon size={19} />
                           </div>

                           <div className="flex-1">
                              <p className="text-sm font-semibold">
                                 {item.label}
                              </p>

                              <p
                                 className={`text-xs ${active
                                    ? "text-slate-300"
                                    : "text-slate-400"
                                    }`}
                              >
                                 {item.description}
                              </p>
                           </div>

                           <ChevronRight
                              size={16}
                              className={
                                 active ? "text-white" : "text-slate-300"
                              }
                           />
                        </button>
                     );
                  })}

                  {/* Security Notice */}
                  <div className="mt-4 rounded-xl bg-slate-50 p-4">
                     <div className="mb-2 flex items-center gap-2">
                        <Shield size={17} className="text-emerald-600" />
                        <span className="text-xs font-semibold text-slate-700">
                           Account protected
                        </span>
                     </div>

                     <p className="text-xs leading-5 text-slate-400">
                        Your account security settings are up to date.
                     </p>
                  </div>
               </aside>

               {/* Content */}
               <main className="rounded-2xl border border-slate-200 bg-white shadow-sm">

                  {/* Profile */}
                  {activeSection === "profile" && (
                     <section>

                        <div className="border-b border-slate-100 p-6 md:p-8">
                           <h2 className="text-xl font-bold text-slate-900">
                              Profile information
                           </h2>

                           <p className="mt-1 text-sm text-slate-500">
                              Update your personal account information.
                           </p>
                        </div>

                        <div className="p-6 md:p-8">

                           {/* Avatar */}
                           <div className="mb-8 flex items-center gap-5">
                              <div className="relative">
                                 {
                                    loading ? <Image src={"/user_profile.png"} height={80} width={80} alt="user_profile" className="rounded-2xl " /> : <Image src={file || "/user_profile.png"} height={80} width={80} alt="user_profile" className="rounded-2xl  " />
                                 }
                                 




                                 <label htmlFor="image" className="cursor-pointer">
                                    <div className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-xl border-4 border-white bg-slate-900 text-white">
                                       <Camera size={15} />
                                    </div>
                                    <input type="file" value="" onChange={(e) => { setFile(e.target.files[0]); updateProfileImage(e.target.files[0]) }} id="image" className="hidden" />
                                 </label>







                              </div>

                              <div>
                                 <h3 className="font-semibold text-slate-900">
                                    Profile photo
                                 </h3>

                                 <p className="mt-1 text-xs text-slate-400">
                                    JPG, PNG or WEBP. Maximum 2MB.
                                 </p>
                              </div>
                           </div>

                           {/* Form */}
                           <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                              <div>
                                 <label className="mb-2 block text-sm font-medium text-slate-700">
                                    First name
                                 </label>

                                 <div className="relative">
                                    
                                    <input
                                       type="text"
                                       defaultValue={firstName}
                                       onChange={(e) =>  setFirstName( () =>{ if(firstName !== user?.firstName) {return e.target.value} }   ) }
                                       className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100 `}
                                    />
                                 </div>
                              </div>

                              <div>
                                 <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Last name
                                 </label>

                                 <div className="relative">
                                    
                                    <input
                                       type="text"
                                       defaultValue={lastName}
                                       onChange={(e) =>  setLastName( () =>{ if(lastName !== user?.lastName) {return e.target.value} }   ) }
                                       className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100`}
                                    />
                                 </div>
                              </div>

                              <div>
                                 <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Email address
                                 </label>

                                 <div className="relative">
                                    
                                       <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                          <Mail size={17} />
                                       </div>
                                    

                                    <input
                                       type="email"
                                       defaultValue={email}
                                       onChange={(e) => setEmail(() => { if(email !== user?.email) {return e.target.value} }) }
                                       className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100 pl-10`}
                                    />
                                 </div>
                              </div>

                              <div>
                                 <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Phone number
                                 </label>

                                 <div className="relative">
                                    
                                       <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                          <Phone size={17} />
                                       </div>
                                    

                                    <input
                                       type="text"
                                       defaultValue={phone}
                                       onChange={(e) => setPhone(() => { if(phone !== user?.phone) { return e.target.value }}) }
                                       className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100 pl-10`}
                                    />
                                 </div>
                              </div>

                           </div>

                           <div className="mt-8 flex justify-end">

                              {
                                 (firstName !== user?.firstName || lastName !== user?.lastName || email !== user?.email || phone !== user?.phone) && (
                                 <button onClick={partialUpdateUser} className={`flex items-center gap-2 cursor-pointer rounded-xl bg-indigo-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-800 ${loading && "w-40 flex items-center justify-center"}`}>
                                 {
                                    loading ? (
                                       <div className="w-4 h-4 rounded-full border-2 border-white border-t-0 animate-spin"></div>
                                    ) : (

                                       <>
                                          <Save size={17} />
                                          Save changes
                                       </>

                                    )
                                 }
                              </button>
                              )}
                              
                           </div>
                        </div>
                     </section>
                  )}

                  {/* Security */}
                  {activeSection === "security" && (
                     <section>

                        <div className="border-b border-slate-100 p-6 md:p-8">
                           <h2 className="text-xl font-bold text-slate-900">
                              Security
                           </h2>

                           <p className="mt-1 text-sm text-slate-500">
                              Manage your password and account security.
                           </p>
                        </div>

                        <div className="max-w-2xl p-6 md:p-8">

                           <div className="space-y-5">
                              <InputField
                                 label="Current password"
                                 type="password"
                              />

                              <InputField
                                 label="New password"
                                 type="password"
                              />

                              <InputField
                                 label="Confirm new password"
                                 type="password"
                              />
                           </div>

                           <button className="mt-8 flex items-center gap-2 rounded-xl bg-indigo-900 px-5 py-3 text-sm font-semibold text-white">
                              <Lock size={17} />
                              Update password
                           </button>

                           <div className="mt-10 rounded-xl border border-amber-100 bg-amber-50 p-5">
                              <h3 className="text-sm font-semibold text-amber-900">
                                 Password recommendation
                              </h3>

                              <p className="mt-1 text-xs leading-5 text-amber-700">
                                 Use at least 8 characters with a combination of
                                 uppercase letters, numbers and symbols.
                              </p>
                           </div>
                        </div>
                     </section>
                  )}

                  {/* Notifications */}
                  {activeSection === "notifications" && (
                     <section>

                        <div className="border-b border-slate-100 p-6 md:p-8">
                           <h2 className="text-xl font-bold text-slate-900">
                              Notifications
                           </h2>

                           <p className="mt-1 text-sm text-slate-500">
                              Choose what notifications you want to receive.
                           </p>
                        </div>

                        <div className="p-6 md:p-8">

                           <NotificationItem
                              title="Email notifications"
                              description="Receive important account notifications by email."
                              enabled={notifications.email}
                              onChange={() =>
                                 setNotifications({
                                    ...notifications,
                                    email: !notifications.email,
                                 })
                              }
                           />

                           <NotificationItem
                              title="System notifications"
                              description="Receive updates and alerts from the platform."
                              enabled={notifications.system}
                              onChange={() =>
                                 setNotifications({
                                    ...notifications,
                                    system: !notifications.system,
                                 })
                              }
                           />

                           <NotificationItem
                              title="Marketing notifications"
                              description="Receive product news and promotional updates."
                              enabled={notifications.marketing}
                              onChange={() =>
                                 setNotifications({
                                    ...notifications,
                                    marketing: !notifications.marketing,
                                 })
                              }
                           />
                        </div>
                     </section>
                  )}

                  {/* Appearance */}
                  {activeSection === "appearance" && (
                     <section>

                        <div className="border-b border-slate-100 p-6 md:p-8">
                           <h2 className="text-xl font-bold text-slate-900">
                              Appearance
                           </h2>

                           <p className="mt-1 text-sm text-slate-500">
                              Customize how the dashboard looks.
                           </p>
                        </div>

                        <div className="p-6 md:p-8">

                           <h3 className="text-sm font-semibold text-slate-800">
                              Theme
                           </h3>

                           <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">

                              <ThemeCard
                                 title="Light"
                                 active
                                 preview="bg-white"
                              />

                              <ThemeCard
                                 title="Dark"
                                 preview="bg-slate-900"
                              />

                              <ThemeCard
                                 title="System"
                                 preview="bg-gradient-to-r from-white to-slate-900"
                              />
                           </div>
                        </div>
                     </section>
                  )}
               </main>
            </div>
         </div>
      </div>
   );
}


/* ---------------- Components ---------------- */

function InputField({ label, type = "text", defaultValue, icon, }: { label: string; type?: string; defaultValue?: string; icon?: React.ReactNode; }) {
   return (
      <div>
         <label className="mb-2 block text-sm font-medium text-slate-700">
            {label}
         </label>

         <div className="relative">
            {icon && (
               <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {icon}
               </div>
            )}

            <input
               type={type}
               defaultValue={defaultValue}
               onChange={(e) => e.target.value}
               className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100 ${icon ? "pl-10" : ""
                  }`}
            />
         </div>
      </div>
   );
}


function NotificationItem({ title, description, enabled, onChange }: {
   title: string; description: string; enabled: boolean; onChange: () => void;
}) {
   return (
      <div className="flex items-center justify-between border-b border-slate-100 py-5 last:border-0">
         <div className="pr-5">
            <h3 className="text-sm font-semibold text-slate-800">
               {title}
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-400">
               {description}
            </p>
         </div>

         <button
            onClick={onChange}
            className={`relative h-6 w-11 shrink-0 rounded-full transition ${enabled ? "bg-indigo-800" : "bg-indigo-200"
               }`}
         >
            <span
               className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${enabled ? "left-6" : "left-1"
                  }`}
            />
         </button>
      </div>
   );
}


function ThemeCard({ title, preview, active = false }: { title: string; preview: string; active?: boolean }) {
   return (
      <button
         className={`rounded-xl border-2 p-2 text-left transition ${active
            ? "border-slate-900"
            : "border-slate-100 hover:border-slate-300"
            }`}
      >
         <div
            className={`h-24 rounded-lg border border-slate-200 ${preview}`}
         />

         <p className="mt-3 px-1 text-sm font-medium text-slate-700">
            {title}
         </p>
      </button>
   );
}