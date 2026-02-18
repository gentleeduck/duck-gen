// src/lib/access-client.tsx
//
// Client-side access control setup.
// Creates the React hooks and components from access-engine.
// Import { AccessProvider, useAccess, Can, Cannot } from this file.

'use client'

import { createAccessControl } from 'access-engine/client/react'
import React from 'react'

export const { AccessProvider, useAccess, usePermissions, Can, Cannot } = createAccessControl(React)
