import React, { useState } from 'react';
import type { User } from '../types';
import UserIcon from './icons/UserIcon';
import MailIcon from './icons/MailIcon';
import MapPinIcon from './icons/MapPinIcon';
import LockClosedIcon from './icons/LockClosedIcon';
import PhoneIcon from './icons/PhoneIcon';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import LogoutIcon from './icons/LogoutIcon';

interface ProfilePageProps {
  user: User;
  onBack: () => void;
  onUpdateUser: (updatedUser: User) => void;
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onBack, onUpdateUser, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user.name,
    address: user.address,
    state: user.state || '',
    country: user.country || '',
    pinCode: user.pinCode || '',
    phoneNumber: user.phoneNumber || '',
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    setPasswordError('');
    setPasswordSuccess('');
  };

  const handleSaveChanges = () => {
    onUpdateUser({ ...user, ...formData });
    setIsEditing(false);
  };
  
  const handleCancelEdit = () => {
    setFormData({ 
        name: user.name, 
        address: user.address,
        state: user.state || '',
        country: user.country || '',
        pinCode: user.pinCode || '',
        phoneNumber: user.phoneNumber || '',
    });
    setIsEditing(false);
  };
  
  const handlePasswordSave = () => {
    setPasswordError('');
    setPasswordSuccess('');

    if (!passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError('Please fill out all password fields.');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }
    if (passwordData.newPassword.length < 6) {
        setPasswordError('New password must be at least 6 characters long.');
        return;
    }
    // In a real app, you'd verify the currentPassword here via an API call.
    console.log("Password change requested for user:", user.email);
    setPasswordSuccess('Password successfully updated!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => {
        setIsChangingPassword(false);
        setPasswordSuccess('');
    }, 2000);
  };

  const DetailItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <div>
        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</label>
        <div className="flex items-center gap-3 mt-1">
            <div className="text-gray-400 dark:text-gray-500">{icon}</div>
            <p className="text-gray-800 dark:text-gray-200">{value}</p>
        </div>
    </div>
  );
  
  const InputField = ({ label, id, ...props } : any) => (
     <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        <input id={id} {...props} className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white" />
    </div>
  )

  return (
    <div className="animate-fadeIn w-full">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                <UserIcon className="w-8 h-8 text-orange-500" />
                My Profile
            </h1>
            <button onClick={onBack} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 font-semibold transition-colors group">
                <ArrowLeftIcon className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
                Back to Shopping
            </button>
        </div>
      
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full flex flex-col">
            <div className="p-6 sm:p-8 space-y-6">
                {isEditing ? (
                    <div className="space-y-4">
                        <InputField label="Full Name" id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} />
                        <InputField label="Delivery Address" id="address" name="address" type="text" value={formData.address} onChange={handleInputChange} />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InputField label="State" id="state" name="state" type="text" value={formData.state} onChange={handleInputChange} />
                            <InputField label="Country" id="country" name="country" type="text" value={formData.country} onChange={handleInputChange} />
                        </div>
                        <InputField label="Pin Code" id="pinCode" name="pinCode" type="text" value={formData.pinCode} onChange={handleInputChange} />
                        <InputField label="Phone Number" id="phoneNumber" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleInputChange} />
                        <DetailItem icon={<MailIcon className="w-5 h-5" />} label="Email (cannot be changed)" value={user.email} />
                    </div>
                ) : (
                    <>
                        <DetailItem icon={<UserIcon className="w-5 h-5" />} label="Full Name" value={user.name} />
                        <DetailItem icon={<MailIcon className="w-5 h-5" />} label="Email" value={user.email} />
                        <DetailItem icon={<PhoneIcon className="w-5 h-5" />} label="Phone Number" value={user.phoneNumber || 'N/A'} />
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
                        <DetailItem icon={<MapPinIcon className="w-5 h-5" />} label="Delivery Address" value={user.address} />
                        <div className="grid grid-cols-2 gap-4">
                            <DetailItem icon={<MapPinIcon className="w-5 h-5" />} label="State" value={user.state || 'N/A'} />
                            <DetailItem icon={<MapPinIcon className="w-5 h-5" />} label="Country" value={user.country || 'N/A'} />
                        </div>
                        <DetailItem icon={<MapPinIcon className="w-5 h-5" />} label="Pin Code" value={user.pinCode || 'N/A'} />
                        </div>
                    </>
                )}
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    {isChangingPassword ? (
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Change Password</h3>
                            <InputField label="Current Password" id="currentPassword" name="currentPassword" type="password" value={passwordData.currentPassword} onChange={handlePasswordInputChange} />
                            <InputField label="New Password" id="newPassword" name="newPassword" type="password" value={passwordData.newPassword} onChange={handlePasswordInputChange} />
                            <InputField label="Confirm New Password" id="confirmPassword" name="confirmPassword" type="password" value={passwordData.confirmPassword} onChange={handlePasswordInputChange} />
                            {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
                            {passwordSuccess && <p className="text-sm text-green-500">{passwordSuccess}</p>}
                            <div className="flex gap-4 pt-2">
                                <button onClick={() => setIsChangingPassword(false)} className="w-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-2.5 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                                    Cancel
                                </button>
                                <button onClick={handlePasswordSave} className="w-full bg-green-500 text-white font-bold py-2.5 rounded-lg hover:bg-green-600 transition-colors">
                                    Save Password
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button onClick={() => setIsChangingPassword(true)} className="w-full text-center text-sm font-semibold text-orange-600 dark:text-orange-400 hover:underline">
                            Change Password
                        </button>
                    )}
                </div>
            </div>

            {!isChangingPassword && (
                <div className="p-6 border-t dark:border-gray-700 flex gap-4">
                    {isEditing ? (
                        <>
                            <button onClick={handleCancelEdit} className="w-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                                Cancel
                            </button>
                            <button onClick={handleSaveChanges} className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-colors">
                                Save Changes
                            </button>
                        </>
                    ) : (
                        <button onClick={() => setIsEditing(true)} className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors">
                            Edit Profile
                        </button>
                    )}
                </div>
            )}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors rounded-md"
                >
                    <LogoutIcon className="w-5 h-5" />
                    Log Out
                </button>
            </div>
      </div>
    </div>
  );
};

export default ProfilePage;