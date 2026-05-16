import { getPayload } from 'payload';
import config from '../../payload.config';

async function init() {
  console.log('Starting standalone Payload initialization...');
  try {
    const payload = await getPayload({ config });
    console.log('Payload initialized successfully. Database schema should be pushed.');
  } catch (error) {
    console.error('Error initializing Payload:', error);
  }
  process.exit(0);
}

init();
