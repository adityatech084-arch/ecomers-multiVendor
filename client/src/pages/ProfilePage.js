import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { updateProfile } from '../features/authSlice'; // your thunk
import axiosInstance from '../utils/axios';

function ProfilePage() {
  const { authUser ,isUpdating} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  // const [isUpdating, setIsUpdating] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); // new state for file

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', about: '', bio: '', gender: ''
  });

useEffect(() => {
  if (authUser) {
    setFormData({
      name: authUser.name || '',
      email: authUser.email || '',
      phone: authUser.phone || '',
      address: authUser.address || '',
      about: authUser.about || '',
      bio: authUser.bio || '',
      gender: authUser.gender || ''
    });

    // Fix preview: use authUser.ProfileImg if exists, else fallback avatar
    setImagePreview(
      authUser.ProfileImg || 
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${authUser._id}`
    );
  }
}, [authUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) return toast.error("File size should be less than 2MB");
      setSelectedFile(file); // store the file

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // const handleSave = async () => {
  //   if (!formData.name.trim()) return toast.warn("Name is required");
  //   setIsUpdating(true);

  //   try {
  //     const payload = new FormData();

  //     // Append all text fields
  //     Object.entries(formData).forEach(([key, value]) => {
  //       payload.append(key, value || '');
  //     });

  //     // Append image file if selected
  //     if (selectedFile) {
  //       payload.append('profilePic', selectedFile);
  //     }

  //     // Dispatch your redux thunk
  //     await dispatch(updateProfile(payload)).unwrap();

  //     setIsEditing(false);
  //     setSelectedFile(null); // reset file
  //     toast.success("Profile updated successfully!");
  //   } catch (error) {
  //     toast.error(error?.message || "Failed to update profile");
  //   } finally {
  //     setIsUpdating(false);
  //   }
  // };


const handleSave = async () => {
  if (!formData.name.trim()) return toast.warn("Name is required");
  // setIsUpdating(true);

  try {
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value || "");
    });

    if (selectedFile) payload.append("profilePic", selectedFile);

    // Debug: check FormData
    // for (let pair of payload.entries()) console.log(pair[0], pair[1]);

    // Dispatch Redux thunk
    const response = await dispatch(updateProfile(payload)).unwrap();

    console.log("Backend response:", response);
    toast.success("Profile updated!");
    setIsEditing(false);
    setSelectedFile(null);
  } catch (err) {
    console.error(err);
    toast.error(err?.message || "Failed to update profile");
  } finally {
    // setIsUpdating(false);
  }
};
  const handleDiscard = () => {
    setIsEditing(false);
    setSelectedFile(null); // reset file
    setFormData({
      name: authUser.name || '',
      email: authUser.email || '',
      phone: authUser.phone || '',
      address: authUser.address || '',
      about: authUser.about || '',
      bio: authUser.bio || '',
      gender: authUser.gender || ''
    });
    setImagePreview(authUser.ProfileImg || `https://api.dicebear.com/7.x/avataaars/svg?seed=${authUser._id}`);
  };

  if (!authUser) {
    return (
      <div className="flex justify-center items-center h-screen bg-transparent">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }
// console.log(authUser)
  return (
    <div className='w-full min-h-screen font-Poppins bg-transparent'>
      {/* Container: Stacked on mobile, row on MD+ */}
      <div className='flex flex-col md:flex-row max-w-7xl mx-auto min-h-screen'>
        {/* LEFT SIDEBAR */}
        <aside className='w-full md:w-80 p-6 md:p-8 flex flex-col items-center md:items-start border-b md:border-b-0 md:border-r border-black/5'>
          <div className='relative group mb-6'>
            <div className='w-32 h-32 md:w-44 md:h-44 rounded-3xl overflow-hidden shadow-sm ring-4 ring-black/5'>
              <img src={ imagePreview||authUser.ProfileImg || `https://api.dicebear.com/7.x/avataaars/svg?seed=${authUser._id}`} alt='Profile' className='w-full h-full object-cover' />
            </div>
            {isEditing && (
              <label className="absolute inset-0 bg-black/60 rounded-3xl flex flex-col items-center justify-center cursor-pointer text-white text-xs opacity-0 group-hover:opacity-100 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                </svg>
                <span className="hidden sm:inline">Change Photo</span>
                <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
              </label>
            )}
          </div>
          <h2 className='text-xl md:text-2xl font-bold text-slate-800 text-center md:text-left'>{formData.name}</h2>
          <p className='text-blue-600 font-medium mb-4 md:mb-6 text-sm text-center md:text-left'>{formData.email}</p>
          <div className='w-full pt-6 border-t border-black/5 space-y-4 hidden md:block'>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Bio Capsule</span>
            <p className='text-sm text-slate-600 leading-relaxed'>{formData.bio || "No public bio provided."}</p>
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <main className='flex-1 p-6 md:p-12 lg:p-16'>
          <div className='max-w-3xl mx-auto md:mx-0'>
            <header className='mb-8 md:mb-12'>
              <h1 className='text-2xl md:text-3xl font-black text-slate-900 tracking-tight'>Profile Settings</h1>
              <div className='h-1.5 w-12 bg-blue-600 rounded-full mt-2'></div>
            </header>

            <div className='space-y-10 md:space-y-12'>
              {/* Public Section */}
              <section>
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <h3 className="font-bold text-slate-800 whitespace-nowrap text-sm md:text-base">Public Information</h3>
                  <div className="flex-1 h-[1px] bg-black/5"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                  <Field label="Full Name" name="name" value={formData.name} isEditing={isEditing} onChange={handleChange} />
                  <Field label="Gender" name="gender" value={formData.gender} isEditing={isEditing} onChange={handleChange} placeholder="e.g. Male" />
                  <div className="sm:col-span-2">
                    <Field label="Short Bio" name="bio" value={formData.bio} isEditing={isEditing} onChange={handleChange} placeholder="Tell us about yourself..." />
                  </div>
                </div>
              </section>

              {/* Private Section */}
              <section>
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <h3 className="font-bold text-slate-800 whitespace-nowrap text-sm md:text-base">Contact Details</h3>
                  <div className="flex-1 h-[1px] bg-black/5"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                  <Field label="Email (Primary)" name="email" value={formData.email} isEditing={isEditing} onChange={handleChange} type="email" />
                  <Field label="Mobile Phone" name="phone" value={formData.phone} isEditing={isEditing} onChange={handleChange} placeholder="+1..." />
                  <div className="sm:col-span-2">
                    <Field label="Current Address" name="address" value={formData.address} isEditing={isEditing} onChange={handleChange} isTextArea />
                  </div>
                </div>
              </section>

              {/* Action Bar */}
              <footer className='pt-6 md:pt-10 flex flex-col sm:flex-row items-center gap-4'>
                {isEditing ? (
                  <>
                    <button 
                      disabled={isUpdating}
                      onClick={handleDiscard} 
                      className='w-full sm:w-auto px-8 py-3 rounded-xl border border-black/10 text-slate-600 hover:bg-black/5 transition-all font-semibold text-sm disabled:opacity-50'
                    >
                      Discard
                    </button>
                    <button 
                      disabled={isUpdating}
                      onClick={handleSave} 
                      className='w-full sm:w-auto px-10 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200/50 transition-all font-semibold text-sm disabled:opacity-70'
                    >
                      {isUpdating ? 'Saving...' : 'Save Changes'}
                    </button>
                  </>
                ) : (
                  <button 
                  disabled={isUpdating}
                    onClick={() => setIsEditing(true)} 
                    className='w-full sm:w-auto px-10 py-3 rounded-xl bg-slate-900 text-white hover:bg-black transition-all font-semibold text-sm shadow-lg shadow-slate-200/50'
                  >
                    Edit Profile Details
                  </button>
                )}
              </footer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

const Field = ({ label, name, value, isEditing, onChange, type="text", isTextArea, placeholder }) => (
  <div className='flex flex-col gap-2'>
    <label className='text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-400'>{label}</label>
    {isEditing ? (
      isTextArea ? (
        <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} 
          className='w-full bg-white/40 backdrop-blur-sm border border-black/5 rounded-xl p-3 md:p-4 focus:bg-white/80 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-200 text-sm' 
          rows="3" />
      ) : (
        <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} 
          className='w-full bg-white/40 backdrop-blur-sm border border-black/5 rounded-xl p-3 md:p-4 focus:bg-white/80 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-200 text-sm' />
      )
    ) : (
      <div className='p-3 md:p-4 rounded-xl bg-black/5 border border-transparent text-slate-700 font-semibold text-sm min-h-[48px] md:min-h-[52px] flex items-center overflow-hidden'>
        <span className="truncate">{value || <span className="text-slate-300 font-normal italic">Not provided</span>}</span>
      </div>
    )}
  </div>
);

export default ProfilePage;