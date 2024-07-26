import React from 'react';
import { createRoot } from 'react-dom/client';
import Questions from './components/Questions';

const container = document.getElementById('react-app');
const root = createRoot(container);

root.render(<Questions />);
