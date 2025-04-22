'use client'
import { ModalType, setModal } from '@/redux/reducer/ModalReduce'
import { UserType } from '@/redux/reducer/UserReduce'
import store from '@/redux/store'
import React, { useEffect, useState } from 'react'
import { FileType } from './archive'
import { ApiItemUser, ApiUploadFile } from '@/api/user'
import Pagination from './pagination'
import { MyImage } from '@/tool/validate/isImage'
import { UploadButton } from '@/tool/button/button'
import AddIcon from '@mui/icons-material/Add';
const Modal = () => {
  const [_currentModal, set_currentModal] = useState<ModalType>(store.getState().modal)
  const [currentUser, setCurrentUser] = useState<UserType>(store.getState().user)


  const update = () => {
    store.subscribe(() => set_currentModal(store.getState().modal))
    store.subscribe(() => setCurrentUser(store.getState().user))


  }
  useEffect(() => {
    update()
  }, [])

  const [items, setItems] = useState<(FileType)[]>([])
  const [_refresh, set_refresh] = useState<number>(0)

  const limit: number = 30
  const [_page, set_page] = useState<number>(0)

  //get Item //
  const getItems = async (position: string, archive: string, hostId: number, page: number, limit: number) => {
    const result = await ApiItemUser({ position, archive, hostId, skip: page * limit, limit })
    setItems(result.data)
  }

  useEffect(() => {
    if (currentUser.position === "admin") {
      getItems(currentUser.position, "file", 0, _page, limit)
    } else {
      getItems(currentUser.position, "file", currentUser.id, _page, limit)
    }
  }, [_page, currentUser.id, currentUser.position, _refresh])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getFile = async (e: any) => {
    const files = e.target.files;
    const file: File | undefined = files ? files[0] : undefined
    const reader: FileReader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = async function () {
        const result = await ApiUploadFile({ position: currentUser.position, archive: "file", file })
        console.log(result)
        if (result.success) {
          setTimeout(() => {
            set_refresh(n => n + 1)
          }, 2000);
        }
      }
    }

  }

  return (
    <div className={`fixed w-full h-screen top-0 left-0 bg-white z-10 ${_currentModal.open ? "block" : "hidden"}`}>
      <div className='p-4 max-w-lg m-auto'>

        <div className='flex justify-between'>
          <div className="flex h-12">
            <h3 className='text-xl font-bold text-lv-11 dark:text-lv-0 h-full flex flex-col justify-center'>{"file".toUpperCase()} </h3>
            <UploadButton
              name={
                <AddIcon className='!w-12 !h-full p-3 opacity-50 hover:opacity-100 cursor-pointer text-lv-11 dark:text-lv-0' />
              }
              onClick={(e) => getFile(e)}
            />
          </div>
        </div>
        <div className='grid grid-cols-1 gap-4' key={_refresh}>
          {
            items && items.length ?
              items.map((n: FileType, index: number) =>
                <div key={index} className='flex cursor-pointer hover:shadow-md hover:bg-slate-50 transition-all duration-200 rounded px-2' onClick={() => store.dispatch(setModal({ open: false, value: n.id }))}>
                  <div className=" rounded relative col-span-1 w-12 !aspect-square overflow-hidden flex flex-col justify-center" >
                    <MyImage src={process.env.ftp_url + n.name} />
                  </div>
                  <div className='line-clamp-2 w-(--per-12) pl-1 flex flex-col justify-center'>{n.name}</div>
                </div>

              )
              : <div>There is no file</div>
          }
        </div>
        <div className="h-12"></div>
        <div className=''>
          <Pagination page={_page} next={() => set_page(n => n + 1)} prev={() => set_page(n => n - 1)} end={items && items.length < limit ? true : false} />
        </div>

      </div>
    </div>

  )
}

export default Modal