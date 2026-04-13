"use server"

import { updateStaffSchema, deleteStaffSchema } from "@/libs/rule";
import { apiService, GetStaffQuery, UpdateStaffRequest } from "@/services/api";

/**
 * Get list of staff with optional division filter
 * MANAJER: Filter by their division only
 * KETUA: See all staff
 */
export async function getStaffList(divisionCode?: string, search?: string) {
    try {
        const query: GetStaffQuery = {};

        if (divisionCode) {
            query.divisionCode = divisionCode;
        }

        if (search) {
            query.search = search;
        }

        const response = await apiService.getStaff(query);

        if (response.success && response.data) {
            return {
                success: true,
                data: response.data,
            };
        } else {
            return {
                success: false,
                message: response.error || "Gagal mengambil data staf",
            };
        }
    } catch (error) {
        return {
            success: false,
            message: "Terjadi kesalahan jaringan",
        };
    }
}

/**
 * Update staff status (Aktif/Non-Aktif)
 * Can be used by MANAJER for their division staff
 */
export async function updateStaffStatus(nim: string, isActive: boolean) {
    try {
        const validatedFields = updateStaffSchema.safeParse({
            isActive,
        });

        if (!validatedFields.success) {
            return {
                success: false,
                message: validatedFields.error.flatten().fieldErrors,
            };
        }

        const response = await apiService.updateStaff(nim, { isActive });

        if (response.success) {
            return {
                success: true,
                message: isActive ? "Staf berhasil diaktifkan" : "Staf berhasil dinonaktifkan",
            };
        } else {
            return {
                success: false,
                message: response.error || "Gagal mengupdate status staf",
            };
        }
    } catch (error) {
        return {
            success: false,
            message: "Terjadi kesalahan jaringan",
        };
    }
}

/**
 * Update staff role and division
 * Only for KETUA
 */
export async function updateStaffRole(nim: string, role: string, divisionCode: string) {
    try {
        const validatedFields = updateStaffSchema.safeParse({
            role,
            divisionCode,
        });

        if (!validatedFields.success) {
            return {
                success: false,
                message: validatedFields.error.flatten().fieldErrors,
            };
        }

        const response = await apiService.updateStaff(nim, { role, divisionCode });

        if (response.success) {
            return {
                success: true,
                message: "Staf berhasil diupdate",
            };
        } else {
            return {
                success: false,
                message: response.error || "Gagal mengupdate staf",
            };
        }
    } catch (error) {
        return {
            success: false,
            message: "Terjadi kesalahan jaringan",
        };
    }
}

/**
 * Delete staff account (soft delete)
 * MANAJER: Can only delete staff in their division
 * KETUA: Can delete any staff except themselves
 */
export async function deleteStaffAccount(nim: string) {
    try {
        const validatedFields = deleteStaffSchema.safeParse({ nim });

        if (!validatedFields.success) {
            return {
                success: false,
                message: validatedFields.error.flatten().fieldErrors,
            };
        }

        const response = await apiService.deleteStaff(nim);

        if (response.success) {
            return {
                success: true,
                message: response.data?.message || "Staf berhasil dihapus",
            };
        } else {
            return {
                success: false,
                message: response.error || "Gagal menghapus staf",
            };
        }
    } catch (error) {
        return {
            success: false,
            message: "Terjadi kesalahan jaringan",
        };
    }
}
