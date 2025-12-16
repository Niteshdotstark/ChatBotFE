// src/app/dashboard/organizations/page.tsx
'use client';

import React from 'react';
import { useDashboard } from '../layout'; // Import from the new layout

export default function OrganizationsPage() {
    const {
        tenants,
        handleOpenCreateTenantForm,
        isLoading,
        planType,
        activeTenant,
        setActiveTenant,
        handleOpenEditTenantForm,
    } = useDashboard();

    return (
        <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="text-2xl font-nunito font-bold text-gray-900 uppercase tracking-wide">
                    YOUR ORGANIZATIONS
                </h3>
                <button
                    onClick={handleOpenCreateTenantForm}
                    className="dotstark-gradient text-white px-3 py-3 pill-button font-nunito font-bold d-flex align-items-center shadow-md"
                    disabled={isLoading || planType === 'expired'}
                >
                    <svg className="w-5 h-5 me-2" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                    NEW ORGANIZATION
                </button>
            </div>

            {isLoading && tenants.length === 0 ? (
                <div className="d-flex justify-content-center py-4">
                    <div className="animate-slow-spin rounded-full h-8 w-8 border-top-2 border-bottom-2 border-dotstark-primary"></div>
                </div>
            ) : tenants.length === 0 ? (
                <div className="text-center py-5 bg-white card-hover dotstark-shadow rounded-3">
                    <p className="text-gray-500">
                        Create your first organization to begin managing knowledge bases.
                    </p>
                </div>
            ) : (
                <div className="grid lg:grid-cols-2 gap-8">
                    {tenants.map((tenant) => (
                        <div
                            key={tenant.id}
                            className={`bg-white card-hover dotstark-shadow p-4 rounded-3 cursor-pointer transition-all ${activeTenant === tenant.id
                                    ? 'border-2 border-dotstark-primary'
                                    : 'border border-gray-100'
                                }`}
                            onClick={() => setActiveTenant(tenant.id)}
                        >
                            <div className="d-flex justify-content-between align-items-start mb-4">
                                <div>
                                    <h3
                                        className={`text-xl font-nunito font-bold ${activeTenant === tenant.id
                                                ? 'text-dotstark-primary'
                                                : 'text-gray-900'
                                            } mb-2`}
                                    >
                                        {tenant.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 font-medium">
                                        Created: {new Date(tenant.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                {activeTenant === tenant.id ? (
                                    <span className="bg-green-100 text-green-800 text-xs font-nunito font-bold px-4 py-2 rounded-full uppercase tracking-wider">
                                        ACTIVE
                                    </span>
                                ) : (
                                    <span className="bg-gray-100 text-gray-500 text-xs font-nunito font-bold px-4 py-2 rounded-full uppercase tracking-wider">
                                        INACTIVE
                                    </span>
                                )}
                            </div>
                            <div className="d-flex justify-content-between align-items-center border-t border-gray-100 pt-4">
                                <div className="text-sm text-gray-600 font-medium">
                                    <p className="mb-0">
                                        ID: {tenant.id} • {tenant.knowledge_item_count} sources •{' '}
                                        {tenant.conversation_count} conversations
                                    </p>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleOpenEditTenantForm(tenant);
                                    }}
                                    className="dotstark-gradient text-white px-4 py-3 mt-2 pill-button font-nunito font-bold text-sm shadow-md"
                                    disabled={planType === 'expired'}
                                >
                                    EDIT
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}