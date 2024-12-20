import type {ActionFunctionArgs} from '@shopify/remix-oxygen';
import {createCookie, json} from '@shopify/remix-oxygen';
import invariant from 'tiny-invariant';

export async function action({request, context}: ActionFunctionArgs) {
  console.log('set PW');
  const formData = await request.formData();
  const pw = String(formData.get('password'));
  const id = String(formData.get('lock_id'));
  console.log('set password', pw, id);
  invariant(id, 'Error ID is required');
  const {lock} = await context.hygraph.query().GetLock({where: {id}});
  if (!lock?.password) {
    return json({
      status: 500,
      message: 'Sorry an unknown error has occurred. Please try again later.',
    });
  }
  if (lock.password === pw) {
    await context.session.set('bypass-page-protection', id);
    return json({
      status: 200,
      message: '',
    });
  } else {
    return json({
      status: 401,
      message: 'Please double check your password and try again.',
    });
  }
}
