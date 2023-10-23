export function tanggal(date: Date) {
   var tahun = date.getFullYear();
   var bulan: number | string = date.getMonth();
   var tanggal = date.getDate();
   var hari: number | string = date.getDay();
   var jam = date.getHours();
   var menit = date.getMinutes();
   var detik = date.getSeconds();
   switch (hari) {
      case 0:
         hari = 'Min';
         break;
      case 1:
         hari = 'Sen';
         break;
      case 2:
         hari = 'Sel';
         break;
      case 3:
         hari = 'Rab';
         break;
      case 4:
         hari = 'Kam';
         break;
      case 5:
         hari = 'Jum';
         break;
      case 6:
         hari = 'Sab';
         break;
   }
   switch (bulan) {
      case 0:
         bulan = 'Jan';
         break;
      case 1:
         bulan = 'Feb';
         break;
      case 2:
         bulan = 'Mar';
         break;
      case 3:
         bulan = 'Apr';
         break;
      case 4:
         bulan = 'Mei';
         break;
      case 5:
         bulan = 'Jun';
         break;
      case 6:
         bulan = 'Jul';
         break;
      case 7:
         bulan = 'Agu';
         break;
      case 8:
         bulan = 'Sep';
         break;
      case 9:
         bulan = 'Okt';
         break;
      case 10:
         bulan = 'Nov';
         break;
      case 11:
         bulan = 'Des';
         break;
   }
   var tampilTanggal = hari + ', ' + tanggal + ' ' + bulan + ' ' + tahun;
   var tampilWaktu = 'Jam: ' + jam + ':' + menit + ':' + detik;
   //  console.log(tampilTanggal);
   //  console.log(tampilWaktu);
   return tampilTanggal;
}
