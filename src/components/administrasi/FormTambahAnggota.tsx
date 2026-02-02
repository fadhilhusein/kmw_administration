"use client";
import React, { useActionState, useEffect, useState } from 'react';
import ComponentCard from '../common/ComponentCard';
import Label from '../form/Label';
import Input from '../form/input/InputField';
import Select from '../form/Select';
import { ChevronDownIcon } from '../../icons';
import { CheckCircleIcon } from '@phosphor-icons/react';
import { addToast } from '@heroui/react';

interface TambahAnggota {
  handler?: any
}

const FormTambahAnggota:React.FC<TambahAnggota> = ({handler}) => {
  const [state, action, isPending] = useActionState(handler, undefined)
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (state?.success) {
      addToast({
        title: "Toast title",
        description: "Toast displayed successfully",
        color: "success",
      })
    } else if (!state?.success && state !== undefined) {
      addToast({
        title: "Toast title",
        description: "Toast displayed successfully",
        color: "success",
      })
    }
    addToast({
        title: "Toast title",
        description: "Toast displayed successfully",
        color: "success",
      })
  }, [state])
  
  const option_divisi = [
    { value: "CM", label: "CM" },
    { value: "BPH", label: "BPH" },
    { value: "EO", label: "EO" },
    { value: "BD", label: "BD" },
    { value: "BE", label: "BE" },
    { value: "HRD", label: "HRD" },
    { value: "NP", label: "NP" },
  ];
  const option_jabatan = [
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
            <Input type="text" name='namaAnggota' hint={state?.errors?.nama ? state.errors.nama : ""} error={state?.errors?.nama} require={true}/>
          </div>
          <div>
            <Label>Nim Anggota</Label>
            <Input type="number" name='nimAnggota' className='no-arrows' hint={state?.errors?.nim ? state.errors.nim : ""} error={state?.errors?.nim} require={true}/>
          </div>
          <div>
            <Label>Divisi Anggota</Label>
            <div className="relative">
              <Select
              options={option_divisi}
              placeholder="Pilih divisi anggota"
              onChange={handleSelectChange}
              className="dark:bg-dark-90"
              name='divisiAnggota'
              defaultValue={state?.divisi}
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
              options={option_jabatan}
              placeholder="Pilih Jabatan"
              onChange={handleSelectChange}
              className="dark:bg-dark-900"
              name='jabatanAnggota'
              defaultValue={state?.jabatan}
              require={true}
            />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <ChevronDownIcon/>
              </span>
            </div>
          </div>
          {state?.success ? (
            <div className='flex items-center text-white px-4 py-2 rounded-md border border-green-600 bg-green-800'>
              <CheckCircleIcon width={18} height={18} className='mr-2'/>
              <p>{state?.message}</p>
            </div>
          ) : state !== undefined ? (
            <div className='flex items-center text-white px-4 py-2 rounded-md border border-red-600 bg-red-800'>
              <CheckCircleIcon width={18} height={18} className='mr-2'/>
              <p>{state?.message}</p>
            </div>
          ) : ""}
          <div>
            <button disabled={isPending ? true : false} className='bg-blue-500 px-4 py-2 rounded-md text-white'>{isPending ? "Loading..." : "Submit"}</button>
          </div>
        </form>
      </ComponentCard>
    </>
  );
}

export default FormTambahAnggota;