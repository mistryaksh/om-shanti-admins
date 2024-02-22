import React from "react";
import { AppWrapper } from "./wrapper";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
     CategoryPage,
     DashboardPage,
     EventsPage,
     LoginPage,
     ProgramsPage,
     NewEventsPage,
     NewCategoryPage,
     BlogsPage,
     NewBlogPage,
     DonationPage,
     NewGalleryPage,
     GalleryPage,
     GalleryDetailsPage,
     AdminProfilePage,
     DonationUserDetails,
     SendMailToDonationPage,
     NewAdminPage,
     AdminDetails,
} from "./pages";
import { ProtectRoute } from "./component";
function App() {
     return (
          <AppWrapper>
               {/* shift in separate folder while project in production */}
               <BrowserRouter>
                    <Routes>
                         <Route path="/" Component={() => <LoginPage />} />
                         <Route element={<ProtectRoute />}>
                              <Route path="/dashboard" Component={() => <DashboardPage />} />

                              <Route path="/events" Component={() => <EventsPage />} />
                              <Route path="/events/new" Component={() => <NewEventsPage />} />
                              <Route path="/events/details/:eventId" Component={() => <NewEventsPage />} />

                              <Route path="/programs" Component={() => <ProgramsPage />} />

                              <Route path="/category" Component={() => <CategoryPage />} />
                              <Route path="/category/new" Component={() => <NewCategoryPage />} />
                              <Route path="/category/:categoryId" Component={() => <NewCategoryPage />} />

                              <Route path="/blogs" Component={() => <BlogsPage />} />
                              <Route path="/blogs/new" Component={() => <NewBlogPage />} />
                              <Route path="/blogs/details/:blogId" Component={() => <NewBlogPage />} />

                              <Route path="/donations" Component={() => <DonationPage />} />
                              <Route path="/donations/details/:donationId" Component={() => <DonationUserDetails />} />
                              <Route
                                   path="/website/send-mail/:donationId"
                                   Component={() => <SendMailToDonationPage />}
                              />

                              <Route path="/gallery" Component={() => <GalleryPage />} />
                              <Route path="/gallery/new" Component={() => <NewGalleryPage />} />
                              <Route path="/gallery/:galleryId" Component={() => <GalleryDetailsPage />} />

                              <Route path="/settings/account" element={<AdminProfilePage />} />
                              <Route path="/settings/new-admin" element={<NewAdminPage />} />
                              <Route path="/settings/admins" element={<AdminDetails />} />
                              <Route path="*" element={<Navigate to="/" replace />} />
                         </Route>
                    </Routes>
               </BrowserRouter>
               {/* shift in separate folder while project in production */}
          </AppWrapper>
     );
}

export default App;
