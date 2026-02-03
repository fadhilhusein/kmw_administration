"use client";
import React, { useActionState, useEffect, useState } from 'react';
import ComponentCard from '../common/ComponentCard';
import Label from '../form/Label';
import Input from '../form/input/InputField';
import Select from '../form/Select';
import { ChevronDownIcon } from '../../icons';
import { CheckCircleIcon } from '@phosphor-icons/react';
import { addToast } from '@heroui/react';
import { emailNotification } from '@/action/email';
import { useAuth } from '@/context/AuthContext';

interface TambahAnggota {
  handler?: any
}

const FormTambahAnggota:React.FC<TambahAnggota> = ({handler}) => {
  const [state, action, isPending] = useActionState<any, any>(handler, undefined)
  const [showPassword, setShowPassword] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    if (state?.success !== undefined) {
      if (state.success) {
        addToast({
          title: "Berhasil menambah anggota",
          description: "Anggota baru berhasil ditambahkan",
          color: "success",
        })
        console.log(state.message)
        emailNotification(state.message?.data?.email, state.message?.data?.name, state.message?.data?.activationCode);
      } else if (!state.success) {
        addToast({
          title: "Gagal menambah anggota",
          description: state.message,
          color: "danger",
        })
      }
    }
  }, [state])
  
  const option_divisi = [
    { value: "CM", label: "CM" },
    { value: "BPH", label: "BPH" },
    { value: "EO", label: "EO" },
    { value: "BD", label: "BD" },
    { value: "BE", label: "BE" },
    { value: "HRD", label: "HRD" },
    { value: "NP", label: "NP" },
    { value: "DR", label: "Director"},
    { value: "VDR", label: "Vice Director"}
  ];

  const option_divisi2 = [
    { value: "CM", label: "CM" },
    { value: "BPH", label: "BPH" },
    { value: "EO", label: "EO" },
    { value: "BD", label: "BD" },
    { value: "BE", label: "BE" },
    { value: "HRD", label: "HRD" },
    { value: "NP", label: "NP" },
  ]

  const option_jabatan = [
    {value: "STAFF", label: "Staff"},
    {value: "MANAJER", label: "Manajer"},
    {value: "KETUA", label: "Ketua"}
  ]

  const option_jabatan2 = [
    {value: "STAFF", label: "Staff"},
    {value: "MANAJER", label: "Manajer"},
  ]

  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };
  return (
    <>
      <ComponentCard title=''>
        <form action={action} className="space-y-6">
          <div>
            <Label>Nama Anggota</Label>
            <Input defaultValue={state?.fields?.nama} type="text" name='namaAnggota' hint={state?.errors?.nama ? state.errors.nama : ""} error={state?.errors?.nama} require={true} placeholder='Pria Solo'/>
          </div>
          <div>
            <Label>Nim Anggota</Label>
            <Input defaultValue={state?.fields?.nim} type="number" name='nimAnggota' className='no-arrows' hint={state?.errors?.nim ? state.errors.nim : ""} error={state?.errors?.nim} require={true} placeholder='12010124380106'/>
          </div>
          <div>
            <Label>Email Anggota</Label>
            <Input defaultValue={state?.fields?.email} type="email" name='emailAnggota' hint={state?.errors?.email ? state.errors.email : ""} error={state?.errors?.email} require={true} placeholder='sawit@gmail.com'/>
          </div>
          <div>
            <Label>Divisi Anggota</Label>
            <div className="relative">
              <Select
              options={user?.role === "KETUA" ? option_divisi : option_divisi2}
              placeholder="Pilih divisi anggota"
              onChange={handleSelectChange}
              className="dark:bg-dark-90"
              name='divisiAnggota'
              require={true}
            />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <ChevronDownIcon/>
              </span>
            </div>
          </div>
          <div>
            <Label>Posisi Anggota</Label>
            <div className="relative">
              <Select
              options={user?.role === "KETUA" ? option_jabatan : option_jabatan2}
              placeholder="Pilih Jabatan"
              onChange={handleSelectChange}
              className="dark:bg-dark-900"
              name='jabatanAnggota'
              require={true}
            />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <ChevronDownIcon/>
              </span>
            </div>
          </div>
          <div>
            <button disabled={isPending ? true : false} className='bg-blue-500 px-4 py-2 rounded-md text-white'>{isPending ? "Loading..." : "Submit"}</button>
          </div>
        </form>
      </ComponentCard>
    </>
  );
}

export default FormTambahAnggota;