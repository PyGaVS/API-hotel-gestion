/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

//HOTEL 
Route.get('/', 'HotelController.index').as('hotel')

Route.post('/', 'HotelController.store').as('create')

Route.put('/:id', 'HotelController.update').as('update')

Route.delete('/:id', 'HotelController.destroy').as('destroy')

//ROOM
Route.get('/room', 'RoomsController.index').as('room')

Route.post('/room', 'RoomsController.store').as('createRoom')

Route.put('/:id/room', 'RoomsController.update').as('updateRoom')

Route.delete('/:id/room', 'RoomsController.destroy').as('destroyRoom')

//STAFF
Route.get('/staff', 'StaffController.index').as('staff')

Route.post('/staff', 'StaffController.store').as('createStaff')

Route.put('/:id/staff', 'StaffController.update').as('updateStaff')

Route.delete('/:id/staff', 'StaffController.destroy').as('destroyStaff')