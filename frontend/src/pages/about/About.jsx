import { Col, Container, Row, Table } from 'react-bootstrap';
import { BoxArrowUpRight } from 'react-bootstrap-icons';

import swapitIcon from '@/assets/swapit-icon.svg';
import useDocumentTitle from '@/hooks/useDocumentTitle';

function About() {
  useDocumentTitle('Acerca de swapIt');

  return (
    <Container className="py-5">
      <Row className="justify-content-center mb-5">
        <Col xs={12} md={8} lg={6} className="text-center">
          <img src={swapitIcon} alt="swapIt" height="128" className="mb-4" />
          <h1 className="fs-3 fw-bold">swapIt</h1>
          <p className="lead text-muted mt-3">
            Prácticas de Desarrollo de Aplicaciones Web. Facultad de Informática. Universidad de Murcia.
          </p>
          <div className="d-flex justify-content-center align-items-center gap-2 mt-4 flex-wrap">
            <a href="https://www.um.es/" target="_blank" rel="noopener noreferrer" className="d-flex">
              <img style={{ height: '24px', width: 'auto' }} src="https://img.shields.io/badge/UMU-red.svg?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADwCAIAAACxN37FAAAAIGNIUk0AAHomAACAhAAA%2BgAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAGYktHRAD%2FAP8A%2F6C9p5MAAAABb3JOVAHPoneaAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDI2LTA2LTIxVDE4OjA0OjE1KzAwOjAwyZCLbwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyNi0wNi0yMVQxODowNDoxNSswMDowMLjNM9MAAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjYtMDYtMjFUMTg6MDQ6MTUrMDA6MDDv2BIMAAAAWmVYSWZNTQAqAAAACAAFARIAAwAAAAEAAQAAARoABQAAAAEAAABKARsABQAAAAEAAABSASgAAwAAAAEAAgAAAhMAAwAAAAEAAQAAAAAAAAAAAEgAAAABAAAASAAAAAEfUvc0AAATMElEQVR42u3daXRV5b3H8ed59pkyn8wTSSCQkERAr1rnEYeiyKBWUGudUKoiVq%2FDsl33VtdqV%2Bv1etXrhF61gCJXKyrVLmvrAMhVmREwECBknk7mnExn2s9zX9AqlmTvk5MzwN%2FfZ%2FlKn7OnfN3ZZ2cP%2FNOKUxgAFSLWCwAQTggaSEHQQAqCBlIQNJCCoIEUBA2kIGggBUEDKQgaSEHQQAqCBlIQNJCCoIEUBA2kIGggBUEDKQgaSEHQQAqCBlIQNJCCoIEUBA2kIGggBUEDKQgaSEHQQAqCBlIQNJCCoIEUBA2kIGggBUEDKQgaSEHQQAqCBlIQNJCCoIEUBA2kIGggBUEDKQgaSEHQQAqCBlIQNJCCoIEUBA2kIGggBUEDKQgaSEHQQAqCBlIQNJCCoIEUBA2kIGggBUEDKQgaSEHQQAqCBlIQNJCCoIEUBA2kIGggBUEDKQgaSEHQQAqCBlIQNJCCoIEUBA2kIGggBUEDKQgaSEHQQAqCBlIQNJCCoIEUBA2kIGggBUEDKQgaSEHQQAqCBlIQNJCCoIEUBA2kIGggxRLVuelSNnQyqQyG8NwUHu8IeQ7K41XNvUYjNM7z07jVaMWVP6Bae5hfjjoi2S4yUhjnkdpQSsmmLubTRx1gFTw31XwtmruZbri181O5wxb6Yg55VGuf0QjBRVEGE9Hbb%2FJPK06J0qx0aXEmZ12%2FkMlRtzEXWv%2FuPe51G7nDHsIclNefdMYpKaf%2FSOojp8AZY5x3%2FeVvnpr60WpQ%2FoCjZFL6xTMZ5yMuJ%2Bfc39XtemGFyHJGpGmllKs375dLucUy8gIwxpTq%2BvgzT3Wt0VoUF6VfdilTarStLTSt96vNA1t2crs1lMX0%2BJIvPCdpxnQlR9%2FaQmt%2F462A2x21pqO3h1Z%2BvyMrq%2ByeO42HNb73ft%2Br7%2FKKCaHMorU3Y%2Bb5xbfeZDxsV3PL8K59PC155Im4h5JPnFF231LjiQzV1gys38STE8K%2BoWRtR%2B4jS8sfuNd42O6OjuEdlTx9lLXoH0qaMa3sF0uMJ3LIbu%2F%2FYD0vzAhhOVVNe84TswqunGs8zP3Juv7OrtD2UCGI4jG0YkqX5qOkZEwFMbmR6IpJ81mYjFFKKcnMFrX0ofsDTVUR2EpKehon33yj2ZpKJiVTo28odXhLms1NSuMjQLNlDWIWugz55xkCfCkcSRA%2FgNTp01Kvu0m5B8M7Z1nXkf%2Fbxxw52aaLGMVIjBYj1gvwzxB06Ep%2F%2BYBsqgpnWlLy4UbTQyYwgKBD55w%2BLf2OpbJnIFwTlDUdeY8%2FGZebE%2Bs1O44h6HEpXvJz1nYgPDtpKYWvZeL118Z6nY5vCHpcnNNOyLz%2FYdnRN%2F5Jyaq2%2FKeficvPjfU6Hd8Q9HhNXHST6OwJ6uzK6FRAt2SmFF5zVazX5riHoMcrpbws65H7ZGvPeCaiDrjyH70vLg%2B75%2FFC0GFQeN1CC7coXQ%2Ft48ofsFUUTJh%2FRazXgwIEHQbJU0uyHrhNtYS4k1bVHXlLb4vLy4v1elCAoMOjcOFPLAnxKjDmnbTy%2B%2B0zJk6YNyfWa0AEgg6PxCmTs5berJq7x%2FpBdbAj946bHTj3HCYIOmwm%2FvRazWYf05G08gds5RMKrpof62WnA0GHTXxRYd6vlsiD7cF%2FRB5sLHhgiT0rM9bLTgeCDqei6xdYnYlBHkkrf8BePnnC%2FLnBDIYgIehwcuTl5j%2FyC3mgKZjB8uCBwofvsaalxnqpSUHQYVa44GpbfrYKBIyHKZ%2FfceLJ%2BXNw7jnMEHSY2XOyC359nzxQZzxMVu8rfGipNdUZ6%2BWlBkGHX%2F68OY4ZFcrnH22A8vgSzp%2BZN%2BvSWC8pQQg6%2FOzZWQX3L5HV%2B0cbIGv2FN5zJ46eIwFBh8L05si8y38cf855yusb4bNDnsTLrsyeeYHR9AMB8%2FPZ6vB91fA9CDoUXpdroLrGYIAtI6PgnjvkoaN20krJuqqiu26zOlMMPt62boM%2BNGyyEKh5JAg6RAdfeMl4QO5FFybOvkINeY78l2rQk3zNtVnnnWP0SaUOLr5fWDTzhTjmblGNPQQdCqEJ11OPDzUYnW%2B2pqUWLL5V1lV%2Fd4OWUqqhunDRTZbkZIMPutZvHK7bhT1waBB0iARjNa%2BtMh6Tc8F5ifPnfbuTVoPDiQsWZJ19ltFn%2FIFDTzytMVxKGiIEHSLBMtv%2B%2Fd%2BGGhoNxliSk4p%2BvkjW72NKMaVkQ9XExbdqiUYPW3J98eXAh%2B%2FxrPA%2FkOkHAkGHiDOLYhl1b60xHpZ7wfkJV1yphr1q0JN45YLsc882GKx8vtoXXxE5JRF8DCR1CDp0Ykp22%2BPLhg130txhL%2F7Xe%2FS6Sr1h7%2BR77%2BY2o0d9dmza0v%2FW6yICz8v74UDQoeMWTe901739jvGwnAvPj794dsKsecYnN6THW7vsZVFQjm%2BD4xHd50OTo5Xmtr2wvPCq%2BQmTJhoMK3n0V0KYnIbr2LS5%2F81VovykcT4R4QcOe%2BjxsWiBmram9%2F9sPCr7zDMyTz%2FNYIA%2BNNSwYhXPL%2F3H0XNwZ5ixLz8Kgh4vUZrb9uLKwbp6w0GCCaP6urZu71v5Ok%2BO%2F8e%2FCC5V%2FGHlKNENmuIehVssvqr65j9%2FGPIU5NBww8o3WH5ROE9uUNzUwYhi0JyZXvbO2Ph%2Bpiqozys9EN7zYqIkr%2FXZV43PSRvo2rajd%2Fkfwn1ygwfzNHLO%2Bbh288FsbZ8vmmchoxi0EDKIx4NzoYW%2Be9GlsJq9LkSX0uPjYX3lB7dafAcams2OpEekvL76V1ew%2FOIw%2F9Q1rrxe0%2B%2BX3GIxfquQ8aeFZn7BiT4waHy4FV7R3UP7fKajhN3GmQjxAbV6QIuPNx6idF15vWHfxKI0v%2BWx54ebmsf6wc7NW3tfeyXs5565ENLrM70GVYuPYz7zX5sjUIozodnN3pyiFPP5o3n8E82guRzySo%2FHeJQlIYFpIZ1MVIyxYZvZVfPS79cHBpgW5hXnFs3X3N70ztqxLXIgUPf8S6ygPPy%2FlDWhDwwov0msVmcKY%2BZ7mVFW2WpJSDQeI4c9ctBD9JCDC9nR6%2B9zG4%2Byp6eJRFtIe2jF2KDd7BFEusfja25j1iAuzhwjUZrf8ptnPa1twX%2Bka9OW3j%2B%2BLhLjwr4wzKL529p1s92HIzeXsa5QtrZSPMlmz0w3HuXr69Nbe8N7gGcsim9EFFzv7PT3m7zAwZGdJXJT1dhfzaSktBZV2JOTjIfpHo%2F%2FYCM3%2BzNHKCto0XxdXU3vrg32A7pet%2BxlPqEsEjswrgl%2FQ6vu9RoPs6elaonFIQStdKlNyHBkmjwix9%2FfL90tVPfQXGdd3t5e41GW%2BPj4k6cx79h%2FD%2FoC9uml9nSTfYbH5ZIdfRH6miJK85v%2F60WvK6iHJ3Vt3ta7erVIig9m8NgXRei17b4ekwei2p1O%2B2llpkcmI%2FD44k%2BZYTH7xuLp7NLZINGgGWMstX%2Bfybv9tPj45FNPVq3u4Cb4HdU3lHTSDOEwea1y%2F%2F6DSlgitIm5xeKrbWn60wfmQ3W97g8rWd6kyP2wFRPuAweNx1iSkxJOnK4GzG73OnrizX0pp54s4ky2tvvr3YxF9TmUUQ2a52X2btpiOizjrDO4LzC2F0IqxbprcmbPMh3YX32IpYT%2BdmtTYkpuy7Llvo5O42Fd23b2vromghfWcc6SrMY3Ph6WO3e2clWP7Wy0lFyqjLPOMB3Y%2B9UWURDVm9ujG3RCXP%2BGzXJoyHhY6ozpydfNkv1jeKel8ngTzr00%2FVST95YH3G73V1t4amJwUw1pHW1W79fVTcZ%2FOJSyfuUqleOM6Alanpbg3rZTHzTZ2hlnnBY346xgzqh%2Bt%2Fi9A85F850nVBgP83f3DP7fNhYXpZciHxbdoC2at3KT%2B1CtyTLFOSYtWcya95u%2Bn%2FjvpJK1lSW%2Ff5SZ3Vg6UFs%2F9JdN3BbKu9rHsJpTspuffdnX2TXagO4dX%2Fcse16kJo1lqmNfjDj7wLvrh1tbjYcJh33K44%2Fqh%2FYE%2B9VQ13lbbfFdi003o%2FtgtbduFw%2Fmbt%2FwifK1HJzFF7r%2B%2BrHpwIyzzyx%2BZbm%2Bf6fpkzxVIBCo2lH45DMZZ59pOlnXhs9VvC3Sf7jiNqt354HmDz8a%2BT9LWbdylcqO4NHz3wkhA3rHl5tMB%2Bb8%2BJKiJ57W9%2B1gZn%2BIUf5AYP%2FXk155OfXkk0wn27L2fZ45ObLrePRKR3l%2BPN%2FZvnqNv9f8xX7Fi24uXf0mO9CmV7Uqr%2B%2Bf9x9SKa9P7m0RHYOlb7w5deldphP0dfd0rH6H5zmjsZqTs5v%2FZ4WnzSW9PunxfPuP8vu7tu3oeW6FSAvH7tns%2Fwg%2B0elaszZgdqqUMTb13ruLX1mu9jfLmnbl84%2BwtT0%2BfW%2BD6BwsX%2FNeMC9vHm5p7Vq9lkf4t9DRon2BP7davTv3ta3%2FvGC%2B%2BVtFiq5bmPovJzW99373x%2Bu8677QmZszjTGmmG5hGY6LT09dfFPBvDlJU0uDmbVr3QbP5kpRPiEaq2m3eVvadtx4u8WZrI6IgwvhrWtkpYVmu%2BfwXBjKHfbBDzZ0btmac9GFJkM1bfKim9N%2FdGrT2vd7P93g%2FXy9znycaYwpxaSFZTlmnZl%2B920T5l6ROLk4mFm3fPS3QEOHqIjG1j5SDO5Y4cX5DU8%2Bl3PBuVan03RwctnUiocf9N1%2B63B7x3BLy%2BGvOFpiYnx%2BriMz05aeFuRM%2FX19jf%2F9Ii%2FOjto5UR5nH66tZ0cfMtms3GK62cN0PTTnrCiz%2FrkXM08%2Fzfhu88OcM6Y5p5%2FgveN2T0fHUHOrHB5mjFmSk%2BJyc%2BKys6ypwZ6v8LZ3ND%2B1jJfE4MUxsQjaYRveuKvuzbdL7rg9uA8wW0a6LSM9paIs5JnW%2F%2B%2FbQxt3i4qoPu%2BC26wswl9AzZch3tG%2F9tPGP30w8afBvUWcc3tWpj0rM8XsJIaBmtfe8FU1i9Ls6K9vbO5YEWV5jXc%2B2LN7T3Rm17VpS%2F2dS0XZD%2FJNU5zz0oLaGx7sP1AdnRm61n%2Fe%2FOBDYkpWTFY3RrdgCaEmFVTeerenzRXpWQ3V1X9z6Q1sSimL4iUyxxRu0WRh8p7blgT6zL%2BLj5N73%2F7KCxfykopoXgN9pJj9jHmc3dPQvGvJvQbna8fP63JtO29uIM0a6XPPxzieGDe0t3rnLXea%2Fp1lPAYO1X59%2BUI1KZ1bY%2FY0gVjutESms%2F%2BzTduvu2Wwpnb8UzvaYG3d1nnX%2BqSXJ0Tg%2BszjjchO7fv4i20%2FWzSmC1yD5%2F5m7%2FaZ8%2FzSz80u8IjsasZw3owxkZc%2BuPfA1plzXZ%2BtNz2rPwa67vpsw%2Farb%2FA0tYmUCP6h%2B%2FgiCjP7N27dtuDGzi83hXhP0EiU39%2F64Ufbz5oT0CSPxLXdY1rH2M6eMSacibpVfHPR%2FMrfPtZ%2FoHq8G1qpgYPVlb%2F%2Fzz0X%2FcTf5xYpeKzW94gsp7epZdfZ11Q9%2BcyQ8aMXgqHLvsp9e379m8rZV8ucpNjumw87Jp6cxG1WVja59T9e6li1Jvv2G%2FJmX5YytZSZn6z9Hn1gsOebStcnn3WsfCvQ0CnKCkP%2BXsKFML5Hi2sWxiO5L9CEMF59TQv5HgUe72BltqYHHnOtWJ296Gf5l12aNGUyC%2BJ21yMF%2Btzdu3e7%2FvpJ5%2FI%2F6kPDojwitymEsnafVpwy%2FqmETUCX9V3cbkm8%2FNyMWZc4y8sScnMdOVnMMtIVzEopn3%2BwoaG%2FvqH7q83dn6z3fr6NJSWJ3FTTq5QMqGFP8nlnFt1y46hnRTj3d3dX3fUgT46PyE9RKubzT3nqd9xmG%2FVvJ1I2v%2F7m4Jad3BH6pbDKH1DV7SIlPmnOBRmXXZJSUpKQl2vPymSaNsrW9g3U1rvr67s2ftG7bqPvy%2B0sLV1kpoT9Bs3xOMaCPkxKNeyV9e2c9TGWIYrSHSUT7RMLrelpFqeTCRbo7vV3dnrrGj01DbK2RbEenlLIM5K5LTxX7iuPT9UcUmzUG%2FI4yxTl%2BRHcJ0mlV%2B1nzOACWqsoLhtPzUfMS6pBj2xs42yQsQxtSqZ9cpG9sMCanmpJdSqpAj09gfZOT12D91CDbGxRzM3TJ%2FLURG6N1H0S43FMBv0tpZhSTCoV0JnPr3wB5vEzxVicldutzGbhmsY0cQxu1uPS0Vt72M84Y3FWbjtutvYxcQw9Ks4Z50wwbtGYw3ZMb0gCSGztY%2BjoB2D8EDSQgqCBFAQNpCBoIAVBAykIGkhB0EAKggZSEDSQgqCBFAQNpCBoIAVBAykIGkhB0EAKggZSEDSQgqCBFAQNpCBoIAVBAykIGkhB0EAKggZSEDSQgqCBFAQNpCBoIAVBAykIGkhB0EAKggZSEDSQgqCBFAQNpCBoIAVBAykIGkhB0EAKggZSEDSQgqCBFAQNpCBoIAVBAykIGkhB0EAKggZSEDSQgqCBFAQNpCBoIAVBAykIGkhB0EAKggZSEDSQgqCBFAQNpCBoIAVBAykIGkhB0EAKggZSEDSQgqCBFAQNpCBoIAVBAykIGkhB0EDK%2FwNGMZjbFhW%2FoAAAAABJRU5ErkJggg%3D%3D" alt="UMU" />
            </a>
            <img style={{ height: '24px', width: 'auto' }} src="https://img.shields.io/badge/react-%2320232a.svg?logo=react&logoColor=%2361DAFB" alt="React" />
            <img style={{ height: '24px', width: 'auto' }} src="https://img.shields.io/badge/vite-%23646CFF.svg?logo=vite&logoColor=white" alt="Vite" />
            <img style={{ height: '24px', width: 'auto' }} src="https://img.shields.io/badge/bootstrap-%238511FA.svg?logo=bootstrap&logoColor=white" alt="Bootstrap" />
            <a href="https://github.com/hsanchezm7/daweb" target="_blank" rel="noopener noreferrer" className="d-flex">
              <img style={{ height: '24px', width: 'auto' }} src="https://img.shields.io/badge/GitHub-hsanchezm7%2Fdaweb-%23121011.svg?logo=github&logoColor=white" alt="GitHub" />
            </a>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center mb-5 g-4">
        <Col xs={12} className="text-center">
          <h2 className="fs-5 fw-semibold mb-3">Miembros del equipo</h2>
        </Col>
        <Col xs={6} sm={4} md={3} className="text-center">
          <a href="https://github.com/hsanchezm7" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-dark d-block">
            <img 
              src="https://avatars.githubusercontent.com/u/61797804" 
              alt="Hugo Sánchez Martínez" 
              className="rounded-circle mb-3 border" 
              style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
            />
            <h3 className="fs-6 fw-bold mb-1">Hugo Sánchez Martínez</h3>
            <span className="text-muted small">@hsanchezm7</span>
          </a>
        </Col>
        <Col xs={6} sm={4} md={3} className="text-center">
          <a href="https://github.com/Pablohct" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-dark d-block">
            <img 
              src="https://avatars.githubusercontent.com/u/92580962" 
              alt="Pablo Hernández Cervantes" 
              className="rounded-circle mb-3 border" 
              style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
            />
            <h3 className="fs-6 fw-bold mb-1">Pablo Hernández Cervantes</h3>
            <span className="text-muted small">@Pablohct</span>
          </a>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <h2 className="fs-5 fw-semibold mb-4 text-center">Créditos</h2>
          <p className="text-muted text-center mb-4 small">
            El desarrollo de este proyecto ha sido posible gracias a las siguientes herramientas, librerías y recursos de código abierto de la comunidad:
          </p>
          <Table borderless size="sm" className="w-auto mx-auto align-middle">
            <tbody>
              <tr>
                <td className="pe-3 fs-6">
                  <a href="https://www.youtube.com/playlist?list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd" target="_blank" rel="noreferrer" className="text-decoration-none link-dark fw-bold">
                    Dave Gray <BoxArrowUpRight className="ms-1 align-baseline" size={11} />
                  </a>
                </td>
                <td className="text-muted small">Implementación de la autenticación y gestión de acceso.</td>
              </tr>
              <tr>
                <td className="pe-3 fs-6">
                  <a href="https://getdatepicker.com" target="_blank" rel="noreferrer" className="text-decoration-none link-dark fw-bold">
                    Tempus Dominus <BoxArrowUpRight className="ms-1 align-baseline" size={11} />
                  </a>
                </td>
                <td className="text-muted small">Componente para la selección de fechas en formularios.</td>
              </tr>
              <tr>
                <td className="pe-3 fs-6">
                  <a href="https://intl-tel-input.com/" target="_blank" rel="noreferrer" className="text-decoration-none link-dark fw-bold">
                    Intl-Tel-Input <BoxArrowUpRight className="ms-1 align-baseline" size={11} />
                  </a>
                </td>
                <td className="text-muted small">Formateo y validación de números de teléfono.</td>
              </tr>
              <tr>
                <td className="pe-3 fs-6">
                  <a href="https://github.com/ericgio/react-bootstrap-typeahead" target="_blank" rel="noreferrer" className="text-decoration-none link-dark fw-bold">
                    React Bootstrap Typeahead <BoxArrowUpRight className="ms-1 align-baseline" size={11} />
                  </a>
                </td>
                <td className="text-muted small">Campos de selección avanzados con autocompletado.</td>
              </tr>
              <tr>
                <td className="pe-3 fs-6">
                  <a href="https://www.frontend.fyi/tutorials/css-3d-perspective-animations" target="_blank" rel="noreferrer" className="text-decoration-none link-dark fw-bold">
                    Jeroen Reumkens <BoxArrowUpRight className="ms-1 align-baseline" size={11} />
                  </a>
                </td>
                <td className="text-muted small">Efecto <em>«3D tilt»</em> en las cartas de productos.</td>
              </tr>
              <tr>
                <td className="pe-3 fs-6">
                  <a href="https://swiperjs.com/" target="_blank" rel="noreferrer" className="text-decoration-none link-dark fw-bold">
                    Swiper.js <BoxArrowUpRight className="ms-1 align-baseline" size={11} />
                  </a>
                </td>
                <td className="text-muted small">Implementación de carruseles de productos fluidos y responsivos.</td>
              </tr>
              <tr>
                <td className="pe-3 fs-6">
                  <a href="https://sonner.emilkowal.ski" target="_blank" rel="noreferrer" className="text-decoration-none link-dark fw-bold">
                    Sonner <BoxArrowUpRight className="ms-1 align-baseline" size={11} />
                  </a>
                </td>
                <td className="text-muted small">Alertas y notificaciones <em>Toast</em> para mejorar la experiencia de usuario.</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
