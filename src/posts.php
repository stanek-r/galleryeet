<?php
include 'connect.php'; ?>

<?php if (isset($_GET['name']) && $_GET['name'] != '.php') {
  $sql = "SELECT * FROM posts where name = '" . $_GET['name'] . "' LIMIT 1";
  $result = $conn->query($sql);
  if ($result->num_rows > 0) {
    if ($row = $result->fetch_assoc()) { ?>
<!DOCTYPE html>
<html lang="cs" data-theme="corporate">
<head>
    <meta charset="UTF-8" />
    <title>GallerYeet - <?php echo $row['title']; ?></title>
    <meta
        name="description"
        content="Cestovní fotografický blog plný inspirace, tipů a triků pro pořizování nezapomenutelných fotografií ze světových destinací. Objevujeme nová místa, hledáme zajímavé kompozice a umělecké nápady na fotografování."
    />
    <meta name="keywords" content="Cestování, Fotografování, Fotografie, Cestvní tipy, Fotografické techniky, Blog, Turistika" />
    <meta name="author" content="GTomy" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="canonical" href="https://galleryeet.net" />

    <link rel="stylesheet" type="text/css" href="/tailwind.v1.css" />
</head>
<body class="text-base">
<!-- Start MENU section -->
<div class="navbar bg-base-100 hidden lg:flex">
    <div class="flex-1">
        <a href="/" class="btn btn-ghost normal-case text-xl">GallerYeet</a>
    </div>
    <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
            <li><a href="/">Domů</a></li>
            <li><a href="/about">O nás</a></li>
            <li><a href="/posts">Příspěvky</a></li>
            <li><a href="/gallery">Fotky</a></li>
            <li><a href="/contact">Kontakt</a></li>
            <!--            <li><a href="/login">Login</a></li>-->
        </ul>
        <!--        <div class="dropdown dropdown-end">-->
        <!--            <label tabindex="0" class="btn btn-ghost btn-circle avatar">-->
        <!--                <div class="w-10 rounded-full">-->
        <!--                    <img src="/images/default-user.png" alt="Profile image" />-->
        <!--                </div>-->
        <!--            </label>-->
        <!--            <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">-->
        <!--                <li>-->
        <!--                    <a class="justify-between">-->
        <!--                        Profile-->
        <!--                        <span class="badge">New</span>-->
        <!--                    </a>-->
        <!--                </li>-->
        <!--                <li><a>Settings</a></li>-->
        <!--                <li><a>Logout</a></li>-->
        <!--            </ul>-->
        <!--        </div>-->
    </div>
</div>
<div class="navbar bg-base-100 lg:hidden flex">
    <div class="navbar-start">
        <div class="dropdown">
            <label tabindex="0" class="btn btn-ghost btn-circle">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
            </label>
            <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li><a href="/">Home</a></li>
                <li><a href="/about">O nás</a></li>
                <li><a href="/posts">Příspěvky</a></li>
                <li><a href="/gallery">Fotky</a></li>
                <li><a href="/contact">Kontakt</a></li>
            </ul>
        </div>
    </div>
    <div class="navbar-center">
        <a href="/" class="btn btn-ghost normal-case text-xl">GallerYeet</a>
    </div>
    <div class="navbar-end">
        <!--        <div class="dropdown dropdown-end">-->
        <!--            <label tabindex="0" class="btn btn-ghost btn-circle avatar">-->
        <!--                <div class="w-10 rounded-full">-->
        <!--                    <img src="/images/stock-user.webp" alt="Profile image" />-->
        <!--                </div>-->
        <!--            </label>-->
        <!--            <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">-->
        <!--                <li>-->
        <!--                    <a class="justify-between">-->
        <!--                        Profile-->
        <!--                        <span class="badge">New</span>-->
        <!--                    </a>-->
        <!--                </li>-->
        <!--                <li><a>Settings</a></li>-->
        <!--                <li><a>Logout</a></li>-->
        <!--            </ul>-->
        <!--        </div>-->
    </div>
</div>
<div class="divider w-full -mt-1"></div>
<!-- End MENU section -->
            <!-- Start Header section -->
            <h1 class="text-6xl text-center mt-10"><?php echo $row['title']; ?></h1>
            <img src="/images/<?php echo $row['photo']; ?>" alt="<?php echo $row['photo']; ?>"
                 class="h-96 mx-auto w-[1536px] max-w-full object-cover mt-10" />
            <!-- End Header section -->

            <!-- Start POST section -->
            <div class="flex flex-col gap-y-3 w-[1024px] max-w-full mx-auto px-6 mt-10">
                <?php echo $row['text']; ?>
            </div>
            <!-- End POST section -->
            <?php }
  }
} else {
   ?>
<!DOCTYPE html>
<html lang="cs" data-theme="corporate">
<head>
    <meta charset="UTF-8" />
    <title>GallerYeet - Příspěvky</title>
    <meta
        name="description"
        content="Cestovní fotografický blog plný inspirace, tipů a triků pro pořizování nezapomenutelných fotografií ze světových destinací. Objevujeme nová místa, hledáme zajímavé kompozice a umělecké nápady na fotografování."
    />
    <meta name="keywords" content="Cestování, Fotografování, Fotografie, Cestvní tipy, Fotografické techniky, Blog, Turistika" />
    <meta name="author" content="GTomy" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="canonical" href="https://galleryeet.net" />

    <link rel="stylesheet" type="text/css" href="/tailwind.v1.css" />
</head>
<body class="text-base">
<!-- Start MENU section -->
<div class="navbar bg-base-100 hidden lg:flex">
    <div class="flex-1">
        <a href="/" class="btn btn-ghost normal-case text-xl">GallerYeet</a>
    </div>
    <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
            <li><a href="/">Domů</a></li>
            <li><a href="/about">O nás</a></li>
            <li><a href="/posts">Příspěvky</a></li>
            <li><a href="/gallery">Fotky</a></li>
            <li><a href="/contact">Kontakt</a></li>
            <!--            <li><a href="/login">Login</a></li>-->
        </ul>
        <!--        <div class="dropdown dropdown-end">-->
        <!--            <label tabindex="0" class="btn btn-ghost btn-circle avatar">-->
        <!--                <div class="w-10 rounded-full">-->
        <!--                    <img src="/images/default-user.png" alt="Profile image" />-->
        <!--                </div>-->
        <!--            </label>-->
        <!--            <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">-->
        <!--                <li>-->
        <!--                    <a class="justify-between">-->
        <!--                        Profile-->
        <!--                        <span class="badge">New</span>-->
        <!--                    </a>-->
        <!--                </li>-->
        <!--                <li><a>Settings</a></li>-->
        <!--                <li><a>Logout</a></li>-->
        <!--            </ul>-->
        <!--        </div>-->
    </div>
</div>
<div class="navbar bg-base-100 lg:hidden flex">
    <div class="navbar-start">
        <div class="dropdown">
            <label tabindex="0" class="btn btn-ghost btn-circle">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
            </label>
            <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li><a href="/">Home</a></li>
                <li><a href="/about">O nás</a></li>
                <li><a href="/posts">Příspěvky</a></li>
                <li><a href="/gallery">Fotky</a></li>
                <li><a href="/contact">Kontakt</a></li>
            </ul>
        </div>
    </div>
    <div class="navbar-center">
        <a href="/" class="btn btn-ghost normal-case text-xl">GallerYeet</a>
    </div>
    <div class="navbar-end">
        <!--        <div class="dropdown dropdown-end">-->
        <!--            <label tabindex="0" class="btn btn-ghost btn-circle avatar">-->
        <!--                <div class="w-10 rounded-full">-->
        <!--                    <img src="/images/stock-user.webp" alt="Profile image" />-->
        <!--                </div>-->
        <!--            </label>-->
        <!--            <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">-->
        <!--                <li>-->
        <!--                    <a class="justify-between">-->
        <!--                        Profile-->
        <!--                        <span class="badge">New</span>-->
        <!--                    </a>-->
        <!--                </li>-->
        <!--                <li><a>Settings</a></li>-->
        <!--                <li><a>Logout</a></li>-->
        <!--            </ul>-->
        <!--        </div>-->
    </div>
</div>
<div class="divider w-full -mt-1"></div>
<!-- End MENU section -->
    <h1 class="text-6xl text-center mt-10">Příspěvky</h1>
    <h2 class="text-center w-[1024px] max-w-full mx-auto px-6 mt-10">
        Zde najdete zajímavé příspěvky na téma fotografování a cestování.
    </h2>
    <?php
    $i = 0;
    $sql = 'SELECT * FROM posts ORDER BY created DESC';
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
      while ($row = $result->fetch_assoc()) {
        if (
          $i == 0
        ) { ?><div class="flex flex-col md:flex-row gap-x-10 gap-y-10 w-[1024px] max-w-full mx-auto px-6 mt-10"><?php } ?>
            <a href="/posts/<?php echo $row['name']; ?>"
               class="card w-full md:w-96 bg-base-100 shadow-xl hover:scale-105">
                <div class="card-body">
                    <h3 class="card-title"><?php echo $row['title']; ?></h3>
                    <p><?php echo $row['subtitle']; ?></p>
                    <div class="card-actions justify-end mt-2">
                        <?php
                        if (
                          $row['created'] > date('Y-m-d', strtotime('-1 week'))
                        ) { ?><div class="badge badge-secondary">Nový</div><?php }
                        $tags = explode('#', $row['tags']);
                        foreach ($tags as $tag) { ?>
                            <div class="badge badge-outline"><?php echo $tag; ?></div>
                            <?php }
                        ?>
                    </div>
                </div>
            </a>
            <?php if ($i == 2) { ?></div><?php $i = 0;} else {$i++;}
      }
    }

    if ($i != 0) { ?></div><?php }

} ?>
<!-- Start Footer section -->
<footer class="footer max-md:footer-center items-center mt-10 p-4 bg-neutral text-neutral-content">
    <div class="items-center grid-flow-col">
        <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
            class="fill-current"
        >
            <path
                d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"
            ></path>
        </svg>
        <p>Copyright © 2023 - GTomy</p>
    </div>
    <div class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a href="https://twitter.com/GallerYeet" target="_blank" aria-label="Twitter">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current">
                <path
                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                ></path>
            </svg>
        </a>
        <a href="https://www.youtube.com/@GallerYeet" target="_blank" aria-label="Youtube">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current">
                <path
                    d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
                ></path>
            </svg>
        </a>
        <a href="https://www.facebook.com/galleryeet" target="_blank" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current">
                <path
                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                ></path>
            </svg>
        </a>
    </div>
</footer>
<!-- End Footer section -->
</body>
</html>
